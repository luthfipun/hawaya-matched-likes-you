const { MY, CARD, CARDS } = require("./constant")
const { DISCOVERY, NEW_PEOPLE, RECENTLY_ONLINE, MATCHING_INTERESTS, MATCHING_SEARCH_CRITERIA } = require("./types")

const PATH_LIKES = MY + 'swly?searchAfter='
const PATH_DO_LIKE = CARD + 'like'
const PATH_DISCOVERY = CARDS + `?listType=${DISCOVERY}&excludedIds=`
const PATH_NEW_PEOPLE = CARDS + `?listType=${NEW_PEOPLE}&excludedIds=`
const PATH_RECENTLY_ONLINE = CARDS + `?listType=${RECENTLY_ONLINE}&excludedIds=`
const PATH_MATCHING_INTEREST = CARDS + `?listType=${MATCHING_INTERESTS}&excludedIds=`
const PATH_MATCHING_SEARCH_CRITERIA = CARDS + `?listType=${MATCHING_SEARCH_CRITERIA}&excludedIds=`

module.exports = {
    PATH_LIKES,
    PATH_DO_LIKE,
    PATH_DISCOVERY,
    PATH_NEW_PEOPLE,
    PATH_RECENTLY_ONLINE,
    PATH_MATCHING_INTEREST,
    PATH_MATCHING_SEARCH_CRITERIA
}