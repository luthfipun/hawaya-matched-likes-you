const { default: axios } = require("axios");
const { PATH_LIKES, PATH_DO_LIKE } = require("./path");

function options(token) {
  return {
    headers: {
      Authorization: token,
      devicetype: "IOS",
      accept: "application/json, text/plain, */*",
      appversion: "4.21.1",
      "accept-language": "en",
      "accept-encoding": "gzip, deflate, br",
      "user-agent": "hawaya/827 CFNetwork/1329 Darwin/21.3.0",
      "device-country": "ID",
      devicemodel: "iPhone SE",
      osversion: "15.3.1",
      "Content-Type": "application/json",
    },
  };
}

async function getLikes(token) {
  return await axios.get(PATH_LIKES, options(token));
}

async function postLikes(token, id) {
  let data = {
    userId: id,
    likeType: "LIKE",
    likedItemId: "",
    source: "DISCOVERY",
  };

  return await axios.post(
    PATH_DO_LIKE + '?rewind=false"',
    JSON.stringify(data),
    options(token)
  );
}

async function getFeed(path, token, excludes) {
  return await axios.get(path + excludes, options(token));
}

module.exports = {
  getLikes,
  getFeed,
  postLikes,
};
