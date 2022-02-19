const core= require('@actions/core');
const github = require('@actions/github');

const { checkUrl, checkHeaders, presentData } = require('./helpers');

try{

    const givenUrl= core.getInput('url');
    console.log(`Using ${givenUrl}!`);

    start(givenUrl);

} catch(error)
{
    core.setFailed(error.message);
}

// Calls on helpers.js functions, and creates a PR comment for GitHub
async function start(targetUrl){
    checkUrl(targetUrl);
    var result = await checkHeaders(targetUrl);
    var presentableResult = presentData(result);
    console.log(presentableResult);

    var comment = "";
    console.log(presentableResult.length);
    if (presentableResult == 0){
        comment = "# Congrats! Looks like all your headers are set correctly!"
    } else{
        comment = "# Oh no! Found issues with the headers of your website :( \n"
        for (i in presentableResult){
            comment = comment.concat("- " + presentableResult[i]) + "\n";
        } 
    }
    console.log(comment);
    core.setOutput("header-issues", comment); 
}

