const { default: axios } = require("axios");
const { PATH_LIKES, PATH_DO_LIKE } = require("./path");

function options(token){
    return {
        headers: {
            'Authorization': token,
            'devicetype': 'IOS',
            'accept': 'application/json, text/plain, */*',
            'appversion': '4.10.15',
            'accept-language': 'en',
            'accept-encoding': 'gzip, deflate, br',
            'user-agent': 'hawaya/479 CFNetwork/1240.0.4 Darwin/20.5.0',
            'device-country': 'ID',
            'devicemodel': 'iPhone SE',
            'osversion': '14.6'
        }
    }
}

async function getLikes(token){
    return await axios.get(PATH_LIKES, options(token))
}

async function postLikes(token, id){
    let data = {
        userId: id,
        likeType: 'LIKE',
        likedItemId: '',
        source: 'DISCOVERY'
    }

    let option = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }

    return await axios.post(PATH_DO_LIKE, JSON.stringify(data), option)
}

async function getFeed(path, token, excludes){
    return await axios.get(path + excludes, options(token))
}

module.exports = {
    getLikes, getFeed, postLikes
}