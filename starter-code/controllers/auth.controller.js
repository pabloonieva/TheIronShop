const mongoose = require('mongoose');
const User = require('../models/user.model')

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
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    address: user.address,
                    paymentMethod: user.paymentMethod
                }); 
                newUser.save()
                .then(() => {
                    req.flash('info', 'Successfully sign up, now you can login!');
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
    res.json({ message: 'Hello World'});
};
module.exports.doLogin = (req, res, next) => {
    //we must add here the function
};
module.exports.logout = (req, res, next) => {
    //we must add here the function
};
