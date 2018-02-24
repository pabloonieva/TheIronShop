const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/logout', authController.logout);

module.exports = router;
