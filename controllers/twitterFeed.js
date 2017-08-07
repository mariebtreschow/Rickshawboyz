"use strict";

const Twitter        = require('twitter');
const ProfileTweets  = require('../models/tweets.js');
const config         = require('../config');

const client = new Twitter(config.twitter);

const params = {
   screen_name : 'rickshawboyz',
   count : 100
};

let self = module.exports = {

   client : client,
   params: params,

   getRickshawBoyzTweetsFromDatabase: function(req, res){
      ProfileTweets.find().exec(function(error, profileTweetsFromDatabase){

            if(!error && tweetsFromDatabase !== undefined){

               res.status(200).send({
                  status : 'success',
                  tweets : profileTweetsFromDatabase
               });
            } else {
               res.status(404).send({
                  status : 'No Tweets found in database',
                  tweets : null
               });
            }
      });
   },

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
