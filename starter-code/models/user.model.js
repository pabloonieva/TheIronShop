const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const HASH_FACTOR = 10;

//creating user class or constructor
// we have name, email, password, address and paymentMethod
const userSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: [true, `Name can't be empty`]
    },
  email: {
    type: String,
    required: [true, `Email can't be empty`]
  },
  password:{
    type: String,
    required: [true, `You need to add your password`]
  },
  address: {
    type: String
  },
  paymentMethod: {
    type: Number
  }
}, { timestamps: true });

//We need methodes
userSchema.pre('save', function(next) {    //function (next)¿?
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(HASH_FACTOR)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next();
                });
        })
        .catch(error => next(error));
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};


//We export the schemas
const User = mongoose.model('User', userSchema);  //¿?
module.exports = User;
