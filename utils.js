const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

module.exports = sleep;
