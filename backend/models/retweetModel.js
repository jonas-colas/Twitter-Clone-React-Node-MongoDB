const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const retweetSchema = new mongoose.Schema({
  user: {type: ObjectId , ref: 'User', required:true},
  post: {type: ObjectId , ref: 'Tweet', trim:true, required:true}, 
  comment: {type:String, trim:true, required:true},
  status: {type: Boolean, default: true}
}, {timestamps:true});

module.exports = mongoose.model('Retweet', retweetSchema);
