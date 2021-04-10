const Tweet = require('../models/tweetModel');


exports.create = async (req, res) => {
  const {posted, img} = req.body;
  const user = req.profile._id;
  
  if(!req.body || !req.profile) return res.json({error: "La publicacíon no puede estar vacía*"});
  try{
    const newP = await new Tweet({user:user, post:posted, img: img});
    const post = await newP.save();
    res.status(201).json({msg: "Post creado con exito!"})
  }catch(e){
    res.status(400).json({error: "Error"})
  }
}

exports.read = async (req, res) => {
  try{
    const posts = await Tweet.find().populate('user', '_id name lname avatar slug').sort('-createdAt')
    return res.json(posts)
  }catch(e){
    res.status(400).json({error: "Error"})
  }
}

exports.postById = async (req, res) => {
  
}

exports.update = async (req, res) => {
  
}

exports.one = async (req, res) => {
  
}

exports.destroy = async (req, res) => {
  
}