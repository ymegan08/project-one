// Add Buttons
var topicsArr = [];
var abstractArr = [];
//buttons appear on page load

function showButtons() {
    $("#button-bar").empty();
    for (var i = 0; i < topicsArr.length; i++) {
        var button = $("<button>");
        button.attr("data-element", topicsArr[i]);
        button.attr("id", "topic-button");
        button.text(topicsArr[i]);
        $("#button-bar").append(button);
    };
};

// query for NYT API
var apiKey = "UA8uSAgssGj8XdWmpw2aN3UOEEBviYiJ";
var topic = "world";
var queryNYT = "https://api.nytimes.com/svc/topstories/v2/" + topic + ".json?api-key=" + apiKey;

$.ajax({
    url: queryNYT,
    method: "GET"
}).then(function(response){
    console.log(response);

    for (const item in response.results) {
        abstractArr.push(response.results[item].abstract);
    }

    console.log(abstractArr);

});

// query for MS Sentiment Analysis API
$.ajax({
  url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.1/sentiment",
  beforeSend: function(xhrObj){
      // Request headers
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}"); // Add API key
  },
  type: "POST",
  // Request body
  data: "{body}",
})

// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});
