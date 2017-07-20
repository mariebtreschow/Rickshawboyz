"use strict";

const Twitter  = require('twitter');

const client = new Twitter({
   consumer_key         : process.env.TWITTER_CONSUMER_KEY,
   consumer_secret      : process.env.TWITTER_CONSUMER_SECRET,
   access_token_key     : process.env.TWITTER_ACCESS_TOKEN_KEY,
   access_token_secret  : process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const params = {
   screen_name : 'rickshawboyz',
};

let self = module.exports = {

   client : client,
   params: params,

   getRickshawBoyzTweets : function(req, res){

      client.get('statuses/user_timeline', params,  function(error, twitterStream, response) {

         if (!error) {

            if (twitterStream !== undefined) {

               res.status(200).send({
                  status : 'success',
                  twitterArray : twitterStream
               });

            } else {
               res.status(404).send({
                  status : 'No Tweets were found',
                  twitterArray : null
               });
            }

         } else {
            res.status(500).send({
               status   : 'error',
               message  : 'Internal error'
            });
         }
      });
   }
};
