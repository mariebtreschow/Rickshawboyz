const ProfileTweets = require('../models/profile');

module.exports = function(stream, io){

   stream.on('data', function(data) {

      let tweetFromProfile = {
         twid: data['id'],
         active: false,
         author: data['user']['name'],
         avatar: data['user']['profile_image_url'],
         body: data['text'],
         date: data['created_at'],
         screenname: data['user']['screen_name']
      };

    let tweetEntryForProfile = new ProfileTweets(tweetFromProfile);

    tweetEntryForProfile.save(function(err) {
       if (!err) {
        io.emit('tweetFromProfile', tweetFromProfile);
       }
    });
  });
};
