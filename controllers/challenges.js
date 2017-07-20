"use strict";

const Twitter     = require('twitter');
const Tweet       = require('../models/tweets.js');
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

   getTweetsSavedInDB : function(req, res, callback){

      Tweet.find().exec(function(error, tweetsFromDatabase){

            if(!error && tweetsFromDatabase !== undefined){

               res.status(200).send({
                  status : 'success',
                  tweets : tweetsFromDatabase
               });
            } else {
               res.status(404).send({
                  status : 'No Tweets found in database',
                  tweets : null
               });
            }
      });
   }
};
