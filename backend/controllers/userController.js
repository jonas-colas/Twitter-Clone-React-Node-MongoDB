const User           = require('../models/userModel');
const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const expressJwt     = require('express-jwt');
const _              = require('lodash');
const fetch          = require('node-fetch');
const {OAuth2Client} = require('google-auth-library');
const sgMail         = require('@sendgrid/mail');

sgMail.setApiKey(process.env.MAIL_KEY);


exports.registerUser = (req, res) => {
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
              name, email, password:hash, isVerified:false, status:true
            });
            newUser.save((err, user) => {
              if(err){
                res.status(400).json({error: "Hubo un error al registrarse"});
              }else{
                const token = jwt.sign({_id: user._id}, process.env.JWT_ACCOUNT_ACTIVATION);
                res.cookie('t', token, {expire: new Date() + 9999});
                const emailData = {
                  from: process.env.EMAIL_FROM,
                  to: to,
                  subject: 'Link de Activacion de Cuenta',
                  html: `
                    <h1>Por favor, haz clic para activar su cuenta</h1>
                    <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                    <hr />
                    <p>${process.env.CLIENT_URL}</p>
                  `
                }

                sgMail.send(emailData).then(sent => {
                  return res.json({
                    message: `Email se ha enviado a ${email}`
                  })
                }).catch(err => {
                  return res.status(400).json({error: "Hubo un error"})
                })
              }
            })
          }
        })
      }
    })
  }

}