// Add Buttons
var topicsArr = ["arts", "automobiles", "books", "business", "fashion", "food", "health", "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sports", "sundayreview", "technology", "theater", "t-magazine", "travel", "upshot", "us", "world"];
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

// query for NYT API

$(document).on("click", "#topic-button", function() {
    var apiKey = "UA8uSAgssGj8XdWmpw2aN3UOEEBviYiJ";
    var topic = $(this).attr("data-element");
    var queryNYT = "https://api.nytimes.com/svc/topstories/v2/" + topic + ".json?api-key=" + apiKey;

    console.log($(this).attr("data-element"));    

    $.ajax({
        url: queryNYT,
        method: "GET"
    }).then(function(response){
        abstractArr = [];
        titleArr = [];
        linkArr = [];
        $("tbody tr").remove();
    
        for (const item in response.results) {
            abstractArr.push(response.results[item].abstract);
            titleArr.push(response.results[item].title);
            linkArr.push(response.results[item].url);
        }
    
        console.log(abstractArr, titleArr, linkArr);
        addArticles(titleArr);
    
    });
});

// add Articles to DOM
function addArticles(array) {
    for (i = 0; i < array.length; i++) {
        var tRow = $("<tr>");
        var articleTd = $("<td>").text(array[i]);
        var emotionTd = $("<td>");
        var giphyTd = $("<td>");
        
        tRow.append(articleTd, emotionTd, giphyTd);
        
        $("tbody").append(tRow);
    }
}


// MS Sentiment Analysis API
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
		"text": "enter text here!"
	}
}
// Console logs response A.K.A sentiment analysis
// Type response: negative, neutral, positive
// score: how negative or positive the overall text analyzed is
    // Below -0.05 is negative, above 0.05 is positive
// ratio: combined total score of negative words compared to combined total score of positive words (-1 to 1)
$.ajax(settings).done(function (response) {
	console.log(response);
});

// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
var data = null;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log("Here");
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].images.downsized_large.url);
    }
});

showButtons();