const mongoose = require('mongoose');
const slug     = require('mongoose-slug-generator');

mongoose.plugin(slug);

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true, maxlength: 32},
  lname: {type: String, trim: true, required: true, maxlength: 32},
  username: {type:String, trim:true, maxlength:255, unique:true},
  email: {type: String, trim: true, required: true, unique: true, lowercase: true,
        maxlength: 32, dropDups: true, match: /\S+@\S+\.\S+/},
  password: {type: String, required: true, minlength: 6},
  sku: {type: Boolean, default: false},
  avatar: {type: String},
  cover: {type: String},
  bio: {type: String},
  phone: {type: String},
  address: {type: String},
  resetPasswordLink: {data: String, default: ''},
  slug: { type: String, slug: "username", unique: true },
  isVerified: {type: Boolean, default: false},
  status: {type: Boolean, default: true}
}, {timestamps:true});

module.exports = mongoose.model('User', userSchema);
