//Mongooose documentation: http://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');

//creating user class or constructor
// we have name, email, password, address and paymentMethod
const cartSchema = new mongoose.Schema({

    productsArray: {
        type: Array,
        default: [],
        items: {
            type: Object
        }
    },

    totalCartPrice: {
        type: Number,
        default: 0
    },

    userEmail: {
        type: String
    }

}, { timestamps: true });

//We export the schemas
const Cart = mongoose.model('Cart', cartSchema);  //¿?
module.exports = Cart;
