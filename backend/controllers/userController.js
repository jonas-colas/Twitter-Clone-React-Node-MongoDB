const User           = require('../models/userModel');
const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const expressJwt     = require('express-jwt');
const _              = require('lodash');
const fetch          = require('node-fetch');
const {OAuth2Client} = require('google-auth-library');
//const sgMail         = require('@sendgrid/mail');

//sgMail.setApiKey(process.env.MAIL_KEY);


exports.register = (req, res) => {
  const {name, email, password} = req.body;
  const username = name + '-' + Date.now().toString();

  if(!name || !email || !password){
    return res.status(400).json({error: "Campo * obligatorio"});
  }else{
    User.findOne({email: email}).exec().then(user => {
      if(user){
        return res.status(409).json({
          error: "Este email ya existe, puedes loguearte!"
        });
      }else{
        bcrypt.hash(password, 10, (err, hash) => {
          if(err){
            return res.status(500).json({error: err});
          }else{
            const newUser = new User({
              name, username, email, password:hash, sku:false, avatar:'avatar/avatar.jpg', 
              cover:'avatar/cover.jpg', isVerified:false, status:true
            });
            newUser.save((err, user) => {
              if(err){
                res.status(400).json({error: "Hubo un error al registrarse"});
              }else{
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
                res.cookie('t', token, {expire: new Date() + 9999});
                const {_id, name, sku} = user;
                return res.json({token, user: {_id, name, sku}});
              }
            })
          }
        })
      }
    })
  }

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
      return res.statut(400).json({
        error: "Usuario ó Contraseña incorrecta"
      });
    }else{
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
      res.cookie('t', token, {expire: new Date() + 9999});
      const {_id, name, sku} = user;
      return res.json({token, user: {_id, name, sku}});
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

exports.read = (req, res) => {
  
};

exports.getUser = async (req, res) => {
  await res.json(req.profile);
};

exports.getUserPublic = (req, res) => {
  
};

exports.updateBio = (req, res) => {
  
};

exports.updateAvatar = (req, res) => {
  
};

exports.updateCover = (req, res) => {
  
};

exports.changePassword = (req, res) => {
  
};

exports.requireLogin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id === req.auth._id;
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
				name: 'Jon Colas',
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