const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const expressFlash = require('express-flash');
const configPassport = require('../configs/passport.config');

module.exports.signup = (req, res, next) => {
    //we must add here the function
};

module.exports.doSignup = (req, res, next) => {
    //we must add here the function
};
module.exports.login = (req, res, next) => {
    res.render('auth/login',{
        //No me va flash
        //flash: req.flash()
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
      passport.authenticate('local-auth', (error, user, validation) => {
        debugger;
        if(error){
          next(error);
        } else if(!user){
            res.render('auth/login', {error: validation});
        } else{
            req.login(user,(error) => {
              if(error){
                next(error);
              } else{
                res.redirect('/home')
              }
            });
        }
      })(req, res, next);

      // User.findOne({email: email})
      //   .then(result => {
      //       //logic here
      //   })
      //   .catch(error => {
      //       //logic here
      //   });
    }
};
module.exports.logout = (req, res, next) => {
  req.session.destroy(error => {
      if (error) {
          next(error);
      } else {
          req.logout();
          //Render o redirect?¿? auth/login o /login?¿?
          res.render("auth/login");
      }
  });
};
