"use strict";

const Twitter  = require('twitter');
const config   = require('../config');

const client = new Twitter(config.twitter);

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
