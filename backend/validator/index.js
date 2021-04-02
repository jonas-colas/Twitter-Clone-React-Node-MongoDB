exports.validate = (req, res, next) => {
  //Name Validation
  req.check('name', 'El campo Nombre es obligatorio').isLength({min:4, max:32}).notEmpty();
  //Email Validation
  req.check('email', 'El email no es válido').matches(/.+\@.+\..+/).withMessage('El email no es válido')
  .isLength({min:4, max:32}).notEmpty();
  req.check('password', 'La contraseña es obligatorio').notEmpty();
  req.check('password').isLength({min:6})
  .withMessage('La contraseña no es válido');

  const errors = req.validationErrors();
  if(errors){
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({error: firstError});
  }
  next();
}