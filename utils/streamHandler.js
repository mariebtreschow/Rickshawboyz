const Tweet = require('../models/tweets');

module.exports = function(stream, io){

  // when tweets get sent our way ...
   stream.on('data', function(data) {
      console.log('\n streamHandler', data)
    // construct a new tweet object
      let tweet = {
         twid: data['id'],
         active: false,
         author: data['user']['name'],
         avatar: data['user']['profile_image_url'],
         body: data['text'],
         date: data['created_at'],
         screenname: data['user']['screen_name']
      };

    let tweetEntry = new Tweet(tweet);
    console.log(tweetEntry)

    tweetEntry.save(function(err) {
       if (!err) {
        io.emit('tweet', tweet);
       }
    });
  });
};
