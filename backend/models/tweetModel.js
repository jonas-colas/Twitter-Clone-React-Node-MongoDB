const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {type: ObjectId , ref: 'User', required:true},
  post: {type:String, trim:true},
  status: {type: Boolean, default: true}
}, {timestamps:true});

module.exports = mongoose.model('Tweet', tweetSchema);
