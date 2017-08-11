const Health         = require('../controllers/health');
const TwitterFeed    = require('../controllers/twitterFeed');
const listChallenges = require('../controllers/challenges');

module.exports = function (app) {

    app.get('/health', Health.check);

    //for the map
    app.get('/', TwitterFeed.getRickshawBoyzTweets);

    app.get('/rickshawboyz', TwitterFeed.getRickshawBoyzTweetsFromDatabase);

    app.get('/challenges', listChallenges.getTweetsSavedInDB);

};
