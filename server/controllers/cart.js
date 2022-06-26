const Cart = require("../models/cart");
const Product = require("../models/product");
var AsyncLock = require('async-lock');
var lock = new AsyncLock();


exports.create = async function(req, res, next){
    var newCart = new Cart({cartItems: {}});
    await newCart.save();
    return res.json(newCart._id);
}

exports.getCart = async function(req, res, next){
    console.log("get Cart");
    cartId = req.params.cartId;
    Cart.findById(cartId, async function(err, cart) { 
        return res.json(cart);
    });
}

exports.addProductToCart = async function(req, res, next){
    cartId = req.body.cartId;
    productId = req.body.productId;
    amount = req.body.amount;
    Cart.findById(cartId, async function(err, cart) { 
        lock.acquire(productId, async function(done) { 
            Product.findById(productId, async function(err, product) {
                if (!err) {
                    if(product.stockAmount > 0){          
                        if(product.stockAmount >= amount){
                            product.stockAmount = product.stockAmount - amount;
                        } else {
                            await done();
                            return res.json("failure not enough stock");
                        }
                        await product.save();
                        if(cart.cartItems.has(productId)){
                            cart.cartItems.set(productId, cart.cartItems.get(productId) + amount);
                        } else {
                            cart.cartItems.set(productId, amount);
                        }
                        cart.save();
                        console.log(cart);
                        await done();
                        return res.json({amount: cart.cartItems.get(productId), status: "success"});
                    } else {
                        console.log(product, "failed");
                        await done();
                        return res.json({amount: cart.cartItems.get(productId), status: "failed"});
                    }
                } else {
                    return res.json({status: "failed"});
                }
            })
        });
    });
}

exports.removeProductFromCart = async function(req, res, next){
    cartId = req.body.cartId;
    productId = req.body.productId;
    amount = req.body.amount
    Cart.findById(cartId, async function(err, cart) { 
            Product.findById(productId, async function(err, product) {
                if (!err) {
                         
                        if(cart.cartItems.has(productId)){
                            await cart.cartItems.set(productId, cart.cartItems.get(productId) - amount);
                            if(cart.cartItems.get(productId) == 0){
                                await cart.cartItems.delete(productId);
                            } 
                            product.stockAmount = product.stockAmount + amount;
                            await product.save();
                            await cart.save();
                            console.log(cart);
                           
                            return res.json({amount: cart.cartItems.get(productId), status: "success"});       
                    }
                } else {
                    return res.json({status: "failed"});
                }
            })
        
    });
}