"use strict";

const Twitter     = require('twitter');
const Tweet = require('../models/tweets.js');
const mongoose    = require('mongoose');


const client = new Twitter({
   consumer_key: process.env.TWITTER_CONSUMER_KEY,
   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


const params = { q : '#MOBGEN', count: 10 };

let self = module.exports = {

   client: client,
   params: params,

   getTweetsBasedOnHashtag : function(req, res){
      //saved these to database

      client.get('search/tweets', params, function(error, tweetsWithHashtag, response) {

         if (!error) {

            if (tweetsWithHashtag !== undefined) {

               res.status(200).send({
                  status : 'success',
                  tweets : tweetsWithHashtag
               });

            } else {
               res.status(404).send({
                  status : 'No Tweets with that hashtag were found',
                  tweets : null
               });
            }

         } else {
            res.status(500).send({
               status   : 'error',
               message  : 'Internal error'
            });
         }
      });
   },

   getTweetsSavedInDB : function(res, callback ){
      //display tweets from database
      Tweet.find({},'twid active author avatar body date screenname',{skip: start, limit: 10})
         .sort({date: 'desc'})
         .exec(function(error, tweetsFromDatabase){

            if(!error){

               tweets = tweetsFromDatabase;

            } else {
               res.status(404).send({
                  status : 'No Tweets in database yet',
                  tweets : null
               });
            }
      });
   }
};
