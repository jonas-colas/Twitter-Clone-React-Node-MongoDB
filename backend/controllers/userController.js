const User           = require('../models/userModel');
const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const expressJwt     = require('express-jwt');
const _              = require('lodash');
const fetch          = require('node-fetch');
const {OAuth2Client} = require('google-auth-library');
//const sgMail         = require('@sendgrid/mail');

//sgMail.setApiKey(process.env.MAIL_KEY);


exports.register = async (req, res) => {
  const {name, lname, email, password} = req.body;
  //const username = name + '-' + Date.now().toString();
  const username = name + '-' + lname;

  if(!name || !lname || !email || !password){
    return res.status(400).json({error: "Campo * obligatorio"});
  }
  const uExist = await User.findOne({email: email});
  if(uExist) return res.status(403).json({
    error: "Este email ya existe, puedes loguearte!"
  }) 
  const hashed =  await bcrypt.hash(password, 10);
  const user = await new User({ name, lname, username, email, password:hashed, sku:false,  
               avatar:'avatar/avatar.jpg', cover:'cover/cover.jpg', isVerified:false, status:true });
  const newUser = await user.save();
  newUser.save((err, user) => {
    if(err){
      res.status(400).json({error: "Hubo un error al registrarse"});
    }else{
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
      res.cookie('t', token, {expire: new Date() + 9999});
      const {_id, name, lname, avatar, slug, sku} = user;
      return res.json({token, user: {_id, name, lname, avatar, slug, sku}});
    }
  });
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    res.status(400).json({
      error: "Todos los campos son obligatorio"
    });
  }
  const logged = await User.findOne({email}).exec((err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "Usuario no registrado. Por favor registrese!"
      });
    }
    if(!bcrypt.compareSync(password, user.password)){
      return res.status(400).json({
        error: "Usuario ó Contraseña incorrecta"
      });
    }else{
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
      res.cookie('t', token, {expire: new Date() + 9999});
      const {_id, name, lname, avatar, slug, sku} = user;
      return res.json({token, user: {_id, name, lname, avatar, slug, sku}});
    }
  })
};

exports.userById = (req, res, next, id) => {
  User.findById(id).select('-password').exec((err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "Usuario no existe"
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = async (req, res) => {
  try{
    const all = await User.find().select('_id name lname avatar slug');
    return res.json(all);
  }catch(e){
    return res.status(400).json({error: "Error al listar los usuarios"});
  }
};

exports.getUser = async (req, res) => {
  await res.json(req.profile);
};

exports.getUserPublic = (req, res) => {
  
};

exports.updateBio = async (req, res) => {
  await User.updateOne(req.profile, {$set: req.body}).exec((err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "No se pudo actualizar el perfil"
      })
    }else{
      User.findById(req.profile).select('_id name lname sku slug avatar').exec((err, newUser) => {
        if(err || !newUser){
          return res.status(400).json({
            error: "Hubo un error al actualizar el perfil"
          })
        }else{
          res.json(newUser);
        }
      })
    }
  })
};

exports.updateAvatar = async (req, res) => {
	//console.log(req.body.data)
	if(!req.body.data){
		return res.status(400).json({
			error:"Foto de Perfil obligatorio"
		});
	}
	
  const {_id} =  req.profile;
  try{
	  const result = await User.updateOne({_id: _id}, {$set: {avatar: req.body.data}},{upsert: true});
    if(result){
      const upU = await User.findById(_id).select('_id name lname sku slug avatar');
      res.status(200).json(upU);
    }
    
  }catch(e){
  	res.status(400).json({error: "Hubo un error al actualizar la foto"})
  	throw({error: "Hubo un error al actualizar la foto"});
  }
};

exports.updateCover = async (req, res) => {
	//console.log(req.body.data)
	if(!req.body.data){
		return res.status(400).json({
			error:"Foto de Perfil obligatorio"
		});
	}
	
  const {_id} =  req.profile;
  try{
	  const result = await User.updateOne({_id: _id}, {$set: {cover: req.body.data}},{upsert: true});
    res.status(200).json({msg: "Cover actualizado con exito"});
  }catch(e){
  	res.status(400).json({error: "Hubo un error al actualizar la foto"})
  	throw({error: "Hubo un error al actualizar la foto"});
  }
};

exports.changePassword = async (req, res) => {
	const {_id} = req.profile;
	const {oldPass, newPass} = req.body;
	//console.log(oldPass, newPass);
	const currentUser = await User.findById(_id);
	const {password}  = currentUser;
	const comparePass = await bcrypt.compare(oldPass, password);
	if(!comparePass){
		return res.status(400).json({
			error: "La contraseña actual no coincide con la que te registraste!"
		});
	}else{
		const newHashed = await bcrypt.hash(newPass, 10);
		currentUser.password = newHashed;
		const newU = await currentUser.save();
		res.status(200).json({
			msg: "Su contraseña ha sido actualizado con exito!"
		});
	}
}

exports.requireLogin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!user){
    return res.status(403).json({error: "Acceso Denegado"});
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if(req.user.sku !== true){
    return res.status(403).json({error: "Espacio Adm"});
  }
  next();
};

exports.logout = (req, res) => {
  res.clearCookie('t');
  res.json({msg: "Cerraste tu session!"});
};

exports.becomeAdmin = (req, res) => {
  
};

exports.createAdmin = (req, res) => {
  bcrypt.hash('Jah712@', 10, (err, hash) => {
		if(err){
			return res.status(500).json({
				error: err
			});
		}else{
			const admin = new User({
				name: 'Jon',
				lname: 'Colas',
				username: 'jon-colas',
				email: 'jonas.colas@yahoo.com',
				password: hash,
				avatar: 'avatar/avatar.jpg',
				sku: true,
				status: 1,
				isVerified: 1
			});
			admin.save((err, result) => { //await 
				if(err){
					res.status(400).json({
						error: err
					});
				}else{
					res.status(201).json({
						message: 'Administrador creado con exito!',
						result
					});
				}
			});
		}
	});
};