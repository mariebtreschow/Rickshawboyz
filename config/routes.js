const Health         = require('../controllers/health');
const TwitterFeed    = require('../controllers/twitterFeed');
const listChallenges = require('../controllers/challenges');

module.exports = function (app) {

    app.get('/health', Health.check);

    app.get('/', TwitterFeed.getRickshawBoyzTweets);

    app.get('/about');

   //not in use right now, need to render from datbase
    app.get('/challenges/test', listChallenges.getTweetsBasedOnHashtag);

     app.get('/challenges', listChallenges.getTweetsSavedInDB);

    app.post('/challenges');
};
