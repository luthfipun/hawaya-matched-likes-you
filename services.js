const { default: axios } = require("axios");
const { PATH_LIKES } = require("./path");

function options(token){
    return {
        headers: {'Authorization': token}
    }
}

async function getLikes(token){
    return await axios.get(PATH_LIKES, options(token))
}

module.exports = {
    getLikes
}