
//For plotting sentiment values
function plotSentiment(posSent, negSent, neutSent, mixedSent) {
    var data = [{
        values: [posSent,negSent,neutSent,mixedSent],
        labels: ['Positive Sentiment', 'Negative Sentiment', 'Neutral Sentiment', 'Mixed Sentiment'],
        type: 'pie'
        }];

    var layout = {
        height: 300,
        width: 400
    };
    Plotly.newPlot('myDiv', data, layout, align = "center");
}

/*Properly display Plotly graph
function insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}*/


//Accessing AWS API GW REST API -> AWS Lambda -> AWS Comprehend for Sentiment Analysis
const getResp = function() {

    //user input in text area
    var requestData = document.getElementById("textInput").value;
    fetch('https://g2wn2pkc5i.execute-api.ap-northeast-2.amazonaws.com/prod/data',{
        method: 'POST',
        body: JSON.stringify({text: requestData}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function(response){
        return response.json();
    }).then(function(data){
        var outputRes = data.body;

        //Extracting different sentiments from object
        var positiveSent = outputRes.Positive * 100;
        var negativeSent = outputRes.Negative * 100;
        var neutralSent = outputRes.Neutral * 100;
        var mixedSent = outputRes.Mixed * 100;

        //var currElem = document.getElementById("sentButton");
        //insertAfter(<h1>Plotly Graph</h1>, currElem);

        var currElem = document.getElementById("sentButton");
        var newElem = '<br><h2 style = "text-align: center; color: #404040;" id = "sentLine">Sentiment Distribution</h2>';
        currElem.insertAdjacentHTML('afterend', newElem);
        plotSentiment(positiveSent, negativeSent, neutralSent, mixedSent);
    }).catch(function(error) {
        console.warn('Something went wrong', error);
    })
};
