const Health         = require('../controllers/health');
const TwitterFeed    = require('../controllers/twitterFeed');
const listChallenges = require('../controllers/challenges');

module.exports = function (app) {

    app.get('/health', Health.check);

    app.get('/', TwitterFeed.getRickshawBoyzTweets);

    app.get('/about');

    app.get('/challenges', listChallenges.getTweetsBasedOnHashtag);

     app.get('/challenges/test', listChallenges.getTweetsSavedInDB);

    app.post('/challenges');
};
