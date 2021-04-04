const express = require('express');
const router  = express.Router();


const {validate} = require('../validator/');
const {register, login, logout, requireLogin, isAuth, isAdmin, read, becomeAdmin,
  userById, getUser, getUserPublic, updateBio, updateAvatar, updateCover, changePassword, createAdmin 
} = require('../controllers/userController');


router.post("/register", validate, register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user/default", requireLogin, isAuth, isAdmin, createAdmin);
router.put("/user/make-admin", requireLogin, isAuth, isAdmin, becomeAdmin);

router.get("/users/read", requireLogin, isAuth, isAdmin, read);
router.get("/users/:userSlug", getUserPublic);
router.get("/users/:userId", getUser);
router.put("/users/update/:userId", requireLogin, isAuth, updateBio);
router.put("/user/avatar/update/:userId", requireLogin, isAuth, updateAvatar);
router.put("/user/cover/update/:userId", requireLogin, isAuth, updateCover);
router.put("/user/password/:userId", requireLogin, isAuth, changePassword);

router.param("userId", userById);

module.exports = router;