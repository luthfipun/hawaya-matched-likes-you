const prompt = require("prompt");
const {
  logProgress,
  logSuccess,
  logError,
  logWarning,
  log,
  logInfo,
} = require("./logging");
const {
  PATH_DISCOVERY,
  PATH_NEW_PEOPLE,
  PATH_RECENTLY_ONLINE,
  PATH_MATCHING_INTEREST,
  PATH_MATCHING_SEARCH_CRITERIA,
} = require("./path");
const { getLikes, getFeed, postLikes } = require("./services");
const sleep = require("./utils");

var globalToken = "";
var likesData = [];
var isFinding = false;
var excluding = [];

prompt.start();

prompt.get(["token"], async function (err, res) {
  if (err) return logError(err);
  if (!res.token) return logWarning("Token is empty!");
  globalToken = res.token;
  await findLikes();
});

async function findLikes() {
  logProgress("Finding likes data...");
  await getLikes(globalToken)
    .then(async (res) => {
      let resData = res.data;
      if (resData.total > 0) {
        logInfo(`Found ${resData.total} likes you`);
        let cards = resData.cards;
        cards.map((e) => {
          e.matchProfile.pictures.map((s) => {
            likesData = [...likesData, s.id];
          });
        });
        await findMathes();
      } else {
        logWarning("No likes data found");
        return 1;
      }
    })
    .catch((e) => {
      logError(e.message);
      return 1;
    });
}

async function findMathes() {
  log(likesData);
  isFinding = true;
  logProgress("Staring find matches...");
  while (isFinding) {
    await findFeeds(PATH_DISCOVERY);
    await findFeeds(PATH_NEW_PEOPLE);
    await findFeeds(PATH_RECENTLY_ONLINE);
    await findFeeds(PATH_MATCHING_INTEREST);
  }
}

async function findFeeds(path) {
  logProgress(`Try find on ${path}`);
  await getFeed(path, globalToken, excluding.join(","))
    .then(async (res) => {
      const data = res.data.cards;
      if (data !== undefined) {
        logInfo(`Getting ${data.length} on ${path}`);
        // let usrIds = data.map((e) => e.matchProfile.userId);
        // excluding = excluding.concat(usrIds);
        await data.forEach(async (element) => {
          if (element.matchProfile.pictures.length > 0) {
            await element.matchProfile.pictures.forEach(async (picItem) => {
              if (likesData.includes(picItem.id)) {
                logInfo(
                  `Horrayy! finding matched likes with ${element.matchProfile.firstName} | ID : ${element.matchProfile.userId}`
                );
                await sleep();
                await doMatched(
                  element.matchProfile.userId,
                  element.matchProfile.firstName
                );
              }
            });
          }
        });
        return;
      } else {
        logInfo(`${path} not found data`);
        return;
      }
    })
    .catch((e) => {
      logError(e.message);
      return 1;
    });
}

async function doMatched(userId, name) {
  logProgress(`Processing matched to ${name}`);
  await postLikes(globalToken, userId)
    .then((res) => {
      if (res.data.matched) {
        logSuccess(`Congrats! your are matches with ${name} now`);
      } else {
        logWarning(`Oops! not matched with ${name} right now`);
      }
    })
    .catch((e) => {
      logError(e.message);
    });
}
