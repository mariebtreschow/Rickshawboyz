"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//challenges from the other tweeters

let profileTweetsSchema = new Schema({
   tweet       : String,
   active      : Boolean,
   author      : String,
   avatar      : String,
   body        : String,
   date        : Date,
   screenname  : String,
   date: { type: Date, default: Date.now },
   active: Boolean
});

let ProfileTweets = mongoose.model('profileTweets', profileTweetsSchema);

module.exports = ProfileTweets;
