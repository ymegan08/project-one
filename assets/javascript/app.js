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
// Fetch wishes using axios
const axios = require('axios');
const {get_language, get_sentiments} = require('./cognitives');
module.exports = async function (context, req) {
    let dataUrl = "insert URL with array of objects to be used here";
    try {
        let getData = await axios.default.get(dataUrl);
        let data = getData.data;
      
        // Get language
        let languageDocuments = {
            "documents" : []
        }
        
        // Loop through and create an array of objects with the format {"id": id, text: "Text"}
        for (let index = 0; index < data.length; index++) {
            let text = data[index] && (data[index].message || data[index].mssage);
            let document = {
                id: index + 1,
                text
            }
            languageDocuments.documents.push(document)
        }

        let getLanguage = await get_language(languageDocuments);
        let language = getLanguage.data;

        // Get sentiments
        let sentimentDocuments = {
            "documents" : []
        }
        
        // Loop through and create an array of objects with the format {"id": id, lanuage: "language short form", text: "Text"}
        for (let index = 0; index < data.length; index++) {
            let text = data[index] && (data[index].message || data[index].mssage);
            let document = {
                id: index + 1,
                language: language.documents && language.documents[index] 
                            && language.documents[index].detectedLanguages[0].iso6391Name,
                text
            }
            // Returns JSON response to be used for sentiment analysis
            sentimentDocuments.documents.push(document)
        }
        let getSentiment = await get_sentiments(sentimentDocuments);
        let sentiment = getSentiment.data;

        // Classify as negative or positive
        let sentimentList = []
        for (let index = 0; index < data.length; index++) {
            let who = data[index].who;
            let state = sentiment.documents[index].score >= 0.5 ? 'Positive' : 'Negative';
            let child = {
                who, 
                state
            }
            // Returns sentiment JSON response
            sentimentList.push(child)
        }
        context.res = {
            status: 200,
            body: sentimentList
        };
    } catch (error) {
        context.log(error)
        context.res = {
            status: 500,
            body: "An error occurred - "+ error
        };
    }
};

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