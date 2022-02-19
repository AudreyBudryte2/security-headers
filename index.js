#!/usr/bin/env node

const { checkUrl, checkHeaders, presentData } = require('./helpers');

async function start(){
    var targetUrl = checkUrl(process.argv[2]);
    var result = await checkHeaders(targetUrl);
    var presentableResult = presentData(result);
    console.log(presentableResult); 
}

start();
