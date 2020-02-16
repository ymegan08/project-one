// Add Buttons
var topicsArr = ["arts", "automobiles", "books", "business", "fashion", "food", "health", "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", "real estate", "science", "sports", "sunday review", "technology", "theater", "t-magazine", "travel", "upshot", "us", "world"];
var abstractArr = [];
var titleArr = [];
var linkArr = [];
//buttons appear on page load

function showButtons() {
    $("#button-bar").empty();
    for (var i = 0; i < topicsArr.length; i++) {
        var button = $("<button>");
        button.attr("data-element", topicsArr[i]);
        button.attr("id", "topic-button");
        button.attr("class", "btn btn-outline-primary")
        button.text(topicsArr[i]);
        $("#button-bar").append(button);
    };
};

   
// $("#dynNYT").remove();
// $("#senNYT").remove();
// $("#gifNYT").remove();
// query for NYT API

$(document).on("click", "#topic-button", function () {
    var apiKey = "UA8uSAgssGj8XdWmpw2aN3UOEEBviYiJ";
    var topic = $(this).attr("data-element");
    var queryNYT = "https://api.nytimes.com/svc/topstories/v2/" + topic + ".json?api-key=" + apiKey;

    $.ajax({
        url: queryNYT,
        method: "GET"
    }).then(function (response) {
        console.log("NYT API worked");

   
        

        abstractArr = [];
        titleArr = [];
        linkArr = [];
        $("#welcome").remove();

       

        for (const item in response.results) {
            abstractArr.push(response.results[item].abstract);
            // titleArr.push(response.results[item].title);
            // linkArr.push(response.results[item].url);
        }

        nytArr = [];

        nytArr.push(abstractArr[0], abstractArr[1], abstractArr[2]);

        console.log(nytArr);

        // Call Twinword API for every string sent to it
        for (let i = 0; i < nytArr.length; i++) {
            // Twinword Sentiment Analysis API
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/",
                "method": "POST",
                "headers": {
                    "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
                    "x-rapidapi-key": "ee17b152f8msh2255cbce79fae02p1d4262jsn63775420543c",
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": {
                    // Give this value of information from NYT API
                    "text": nytArr[i]
                }
            }



            console.log(settings);

            $.ajax(settings).done(function (response) {
                // Extract positive, neutral, negative string to add too emotion coloumn
                var sentimentAnalysis = response.type
                var keywords = response.keywords[i].word;
                console.log(response)
                // feed GIPHY API response.type string
                var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=" + keywords;
                var GiphyLink;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var abstractText = settings.data.text
                    console.log("Giphy API Worked");
                    // store image link to GiphyLink
                    GiphyLink = response.data.images.downsized_large.url;
                    // have GIPHY shown on the columns
                    addItems(nytArr[i], sentimentAnalysis, GiphyLink);
                });

            });

        }



    });

});



// add Articles to DOM
function addItems(string, SentimentAnalysis, GiphyLink) {

    // var tRow = $("<tr>");
    var nyt = $("<div id='nytBox'>");
    var sen = $("<div id='senBox'>");
    var gifBox = $("<div id='gifBox'>");


    var articleTd = nyt.html(string);
    var emotionTd = sen.html(SentimentAnalysis);
    var giphyTd = gifBox.html("<img src=" + GiphyLink + ">");

    $("#dynNYT").append(articleTd);
    $("#senNYT").append(emotionTd);
    $("#gifNYT").append(giphyTd);

}


showButtons();