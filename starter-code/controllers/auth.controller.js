const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.signup = (req, res, next) => {
    //we must add here the function
};

module.exports.doSignup = (req, res, next) => {
    //we must add here the function
};
module.exports.login = (req, res, next) => {
    res.render('auth/login',{
        flash: req.flash()
    });
};
module.exports.doLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password){
      res.render('auth/login',{
        email: { email: email },
        error: {
                  email: email ? '' : 'Email is required',
                  password: password ? '' : 'Password is required'
              }
      });
    } else {
      User.findOne({email: email})
        .then(result => {

        })
        .catch(error => {

        });
    }
};
module.exports.logout = (req, res, next) => {
    //we must add here the function
};
