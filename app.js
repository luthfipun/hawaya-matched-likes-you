const prompt = require('prompt');
const { logProgress, logSuccess, logError, logWarning, log } = require('./logging');
const { getLikes } = require('./services');

var globalToken = ''

prompt.start();

prompt.get(['token'], async function(err, res){

    if(err) return logError(err);
    if(!res.token) return logWarning('Token is empty!')
    globalToken = res.token

    await checkRequest()

});

async function checkRequest(){
    await getLikes(globalToken)
        .then((res) => {
            log(res.data)
        })
        .catch((e) => {
            logError(e.message)
            return 1
        })
}