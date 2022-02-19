const checkMyHeaders = require('check-my-headers');

// Catch any uncaught exceptions and return the name and message of the error in console
process.on('uncaughtException', (err) => {
    console.log("An error occured! :( ")
    console.log(err.name)
    console.log(err.message)
});

// Check if given url conforms to a URL
function checkUrl(url) {
    try {        
        checkedUrl = new URL(url);
        return url;
    } catch (_) {
        throw new Error('The URL: "' + url + '" was not typed in correctly. Example: https://example.com'); 
    }
}

// Call on "checkMyHeaders" library with given url, return just the { messages }
async function checkHeaders(targetUrl){
    var result = [];
    result = await checkMyHeaders(targetUrl);
    return result.messages;
}

// Function to restructure data, and add some text
function presentData(recommendedHeaders) {
    var result = [];
    for (i in recommendedHeaders){
        //console.log("Issue found: " + recommendedHeaders[i].msg + " (" + recommendedHeaders[i].type + ")");
        result.push("Issue found: " + recommendedHeaders[i].msg + " (" + recommendedHeaders[i].type + ")");
    }
    return result;
}

module.exports = {
    presentData, checkUrl, checkHeaders
}
  