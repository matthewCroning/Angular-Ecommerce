const Cart = require("../models/cart");
const Product = require("../models/product");
const ProductVariation = require("../models/productVariation");
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
    Cart.findById(cartId).populate('cartItems.$*.productVariation').exec(async function(err, cart) { 
        return res.json(cart);
    });
}

exports.addProductToCart = async function(req, res, next){
    cartId = req.body.cartId;
    productVariationId = req.body.productVariationId;
    amount = req.body.amount;
    Cart.findById(cartId, async function(err, cart) { 
        lock.acquire(productVariationId, async function(done) { 
            ProductVariation.findById(productVariationId, async function(err, productVariation) {
                if (!err) {
                    if(productVariation.stockAmount > 0){          
                        if(productVariation.stockAmount >= amount){
                            productVariation.stockAmount = productVariation.stockAmount - amount;
                        } else {
                            await done();
                            return res.json("failure not enough stock");
                        }
                        await productVariation.save();
                        if(cart.cartItems.has(productVariationId)){
                            cart.cartItems.set(productVariationId, {amount: cart.cartItems.get(productVariationId).amount + amount, productVariation: productVariation});
                        } else {
                            cart.cartItems.set(productVariationId, {amount: amount, productVariation: productVariation});
                        }
                        cart.save();
                        console.log(cart);
                        await done();
                        return res.json({cartItem : {amount: cart.cartItems.get(productVariationId).amount, productVariation: productVariation}, status: "success"});
                    } else {
                        console.log(productVariation, "failed");
                        await done();
                        return res.json({cartItem : {amount: cart.cartItems.get(productVariationId).amount, productVariation: productVariation}, status: "failed"});
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
    productVariationId = req.body.productVariationId;
    amount = req.body.amount
    Cart.findById(cartId, async function(err, cart) { 
            ProductVariation.findById(productVariationId, async function(err, productVariation) {
                if (!err) {
                         
                        if(cart.cartItems.has(productVariationId)){
                            productVariation.stockAmount = productVariation.stockAmount + amount;
                            await productVariation.save();
                            
                            if(cart.cartItems.get(productVariationId).amount - amount == 0){
                                await cart.cartItems.delete(productVariationId);    
                                await cart.save();
                                console.log(cart);
                                return res.json({cartItem: {amount: 0, productVariation: productVariation}, status: "success"});       
                            } else {
                                await cart.cartItems.set(productVariationId, {amount: cart.cartItems.get(productVariationId).amount - amount, productVariation: productVariation});
                            }
                            await cart.save();
                            console.log(cart);
                            return res.json({cartItem: {amount: cart.cartItems.get(productVariationId).amount, productVariation: productVariation}, status: "success"});       
                    }
                } else {
                    return res.json({status: "failed"});
                }
            })
        
    });
}