const Order = require("../models/order");
const Cart = require("../models/cart");
const Auth = require("../controllers/auth");
const User = require("../models/user");

exports.create = function(req, res, next){  
    cartId = req.body.cartId;
    deliveryAddress = req.body.deliveryAddress;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    phone = req.body.phone;
    payment = req.body.payment;
    deliveryType = req.body.deliveryType;
    const token = req.headers.authorization || '';
    user = Auth.parseToken(token);
;
    User.findById(user.userId).exec(function(err, foundUser) {

        Cart.findById(cartId).populate('cartItems.$*.productVariation').exec( function(err, cart) {
            var items = [];
            var cartItems = cart.cartItems.toJSON();
            var totalPrice = 0;
            var result = Object.keys(cart.cartItems.toJSON()).map((key) => {
                items.push({
                    amount: cart.cartItems.get(key)['amount'],
                    product: cart.cartItems.get(key)['product'],
                    productVariation: cart.cartItems.get(key)['productVariation']
                })
                totalPrice = toalPrice + (cart.cartItems.get(key)['productVariation']['price']) * cart.cartItems.get(key)['amount'];
            });
            var newOrder = new Order({orderTime: new Date(), status: "pending",  totalPrice: totalPrice, orderItems: items, firstName: firstName, lastName: lastName, email: email, phone: phone, payment: payment, deliveryAddress: deliveryAddress, deliveryType: deliveryType, user: foundUser});
            newOrder.save();
            cart.cartItems = {};
            cart.save();
            return res.json(cart);
        });
    });
    return;
}

exports.findAll = function(req, res, next){  
    status = req.params.status
    Order.find({status: status}).populate('orderItems.productVariation').populate('orderItems.product').sort({orderTime: 1}).exec(function(err, product) {
        if (!err) { 
            return res.json(product);
        } else {
            throw err;
        }
    });
}

exports.changeStatus = function(req, res, next){  
    orderId = req.params.orderId;
    status = req.body.status;
    Order.findById(orderId).exec(function(err, order) {
        if (!err) { 
            order.status = status;
            order.save();
            return res.json(order);
        } else {
            throw err;
        }
    });
}

exports.findOrdersByUser = function(req, res, next){  
    const token = req.headers.authorization || '';
    user = Auth.parseToken(token);

    Order.find({user: {_id: user.userId}}).exec(function(err, product) {
        if (!err) { 
            return res.json(product);
        } else {
            throw err;
        }
    });
}

exports.findOrder = function(req, res, next){  
    const token = req.headers.authorization || '';
    user = Auth.parseToken(token);
    orderId = req.params.orderId
    Order.findOne({_id : orderId, user: {_id: user.userId}}).exec(function(err, product) {
        if (!err) { 
            return res.json(product);
        } else {
            throw err;
        }
    });
}