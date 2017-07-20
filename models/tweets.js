"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//challenges from the other tweeters

let TweetsSchema = new Schema({
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

let Tweet = mongoose.model('tweets', TweetsSchema);

module.exports = Tweet;
