const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

module.exports.setup = (passport) => {
    passport.serializeUser((user, next) => {
      // console.log('User serializado =>');
      //   console.log(user);
        next(null, user._id);
    });
    passport.deserializeUser((id, next) => {
      // console.log('User serializado =>');
      // console.log(id);
      User.findById(id)
          .then(user => {
              next(null, user);
          })
          .catch(error => next(error, null));
    });
    passport.use('local-auth', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, next) => {
        User.findOne({ email: email})
            .then(user => {
                if (!user) {
                    next(null, user, { password: 'Invalid email or password' });
                } else {
                    user.checkPassword(password)
                        .then(match => {
                            if (match) {
                                next(null, user);
                            } else {
                                next(null, null, { password: 'Invalid email or password' });
                            }
                        })
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    }));
};

//Esto?
module.exports.checkIsAuthenticated = (req, res, next) => {
     if (req.isAuthenticated()) {
         next();
     } else {
         res.status(401);
         res.redirect('/login');
     }
 };

 module.exports.checkRole = (role) => {
     return (req, res, next) => {
         if (!req.isAuthenticated()) {
             res.status(401);
             res.redirect('/login');
         } else if (req.user.role === role) {
             next();
         } else {
             res.status(403);
             res.render('error', {
                 message: 'Forbidden',
                 error: {}
             });
         }
     };
 };
