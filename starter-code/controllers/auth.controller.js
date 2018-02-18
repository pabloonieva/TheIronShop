const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const expressFlash = require('express-flash');
const configPassport = require('../configs/passport.config');

module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
};

module.exports.doSignup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then (user => {
            if (user != null){
                res.render('auth/signup', {
                    email: req.body.email,
                    error: {email: `Email already exists`}
                });

            }else{
                const newUser = new User( {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    address: req.body.address,
                    paymentMethod: req.body.paymentMethod
                });
                newUser.save()
                .then(() => {
                    //req.flash('info', 'Successfully sign up, now you can login!');
                    console.log('Successfully signed up, now you can login!');
                    res.redirect('/login');
                })
                .catch(error => {
                    if (error instanceof mongoose.Error.ValidationError) {
                        res.render('auth/signup', {
                        user: req.body.email,
                        error: error.errors
                    });
                    } else {
                        next(error);
                    }
                });
            }
        }).catch(error => next(error));
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
        if(error){
          next(error);
        } else if(!user){
            res.render('auth/login', {error: validation});
        } else{
            req.login(user,(error) => {
              if(error){
                next(error);
              } else{
                req.session.currentUser = user;
                if(req.session.currentUser.isAdmin){
                  res.redirect('/edit');
                }else{
                  res.redirect('/home');
                }
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
