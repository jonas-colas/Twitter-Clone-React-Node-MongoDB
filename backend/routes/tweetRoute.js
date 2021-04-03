const express = require('express');
const router  = express.Router();


const {userById, requireLogin, isAuth, isAdmin} = require('../controllers/userController');
const {read, create, update, one, destroy} = require('../controllers/tweetController');


router.get("/tweets/read", read);
router.post("/tweets/create/:userId", requireLogin, isAuth, create);
router.get("/tweets/:postId", one);
router.put("/tweets/edit/:userId/:postId", requireLogin, isAuth, update);
router.delete("/tweets/destroy/:postId", requireLogin, isAuth, destroy);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;