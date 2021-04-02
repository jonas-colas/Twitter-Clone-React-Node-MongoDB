const express = require('express');
const router  = express.Router();


const {validate} = require('../validator/');
const {registerUser} = require('../controllers/userController');


router.post("/register", validate, registerUser);


module.exports = router;