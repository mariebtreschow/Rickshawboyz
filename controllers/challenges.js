"use strict";

const Twitter     = require('twitter');
const Tweet       = require('../models/tweets.js');
const mongoose    = require('mongoose');
const config      = require('../config');

const client = new Twitter(config.twitter);

const params = { q : '#MOBGEN', count: 10 };

let self = module.exports = {

   client: client,
   params: params,


   getTweetsSavedInDB : function(req, res, callback){

      Tweet.find().exec(function(error, tweetsFromDatabase){

            if(!error && tweetsFromDatabase !== undefined && tweetsFromDatabase.screenname !== 'rickshawboyz'){

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
   },

   getTweetsBasedOnHashtag : function(req, res){
   //NOT IS USE RIGHT NOW

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
   }
};
