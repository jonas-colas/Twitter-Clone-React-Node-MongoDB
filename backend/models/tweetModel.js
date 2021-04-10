const mongoose   = require('mongoose');
const {ObjectId} = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
  user: {type: ObjectId, ref: 'User', required:true},
  post: {type:String, trim:true, required:true},
  img: {type:String},
  status: {type: Boolean, default: true}
}, {timestamps:true});

module.exports = mongoose.model('Tweet', tweetSchema);
