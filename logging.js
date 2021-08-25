const chlk = require('chalk');

function logError(msg){
    console.log(chlk.red(msg))
}

function log(msg){
    console.log(chlk.gray(msg))
}

function logSuccess(msg){
    console.log(chlk.green(msg))
}

function logWarning(msg){
    console.log(chlk.yellow(msg))
}

function logProgress(msg){
    console.log(chlk.blue(msg))
}

function logInfo(msg){
    console.log(chlk.magenta(msg))
}

module.exports = {
    logError, log, logSuccess, logWarning, logProgress, logInfo
}