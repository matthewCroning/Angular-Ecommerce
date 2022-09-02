const Cart = require("../models/cart");
const Product = require("../models/product");
const ProductVariation = require("../models/productVariation");
var AsyncLock = require('async-lock');
var lock = new AsyncLock();


exports.create = async function(req, res, next){
    var newCart = new Cart({cartItems: {}, amount: 0});
    await newCart.save();
    return res.json(newCart._id);
}

exports.getCart = async function(req, res, next){
    console.log("get Cart");
    cartId = req.params.cartId;
    Cart.findById(cartId).populate('cartItems.$*.productVariation').populate('cartItems.$*.product').exec(async function(err, cart) { 
        return res.json(cart);
    });
}

exports.addProductToCart = async function(req, res, next){
    cartId = req.body.cartId;
    productVariationId = req.body.productVariationId;
    productId = req.body.productId;
    amount = req.body.amount;
    Cart.findById(cartId, async function(err, cart) { 
        lock.acquire(productVariationId, async function(done) { 
            ProductVariation.findById(productVariationId, async function(err, productVariation) {
                Product.findById(productId, async function(err, product){
                    if (!err && productVariation != null) {
                        if(productVariation.stockAmount > 0){          
                            if(productVariation.stockAmount >= amount){
                                productVariation.stockAmount = productVariation.stockAmount - amount;
                            } else {
                                await done();
                                return res.json("failure not enough stock");
                            }
                            await productVariation.save();
                            cart.amount = cart.amount + amount;
                            if(cart.cartItems.has(productVariationId)){
                                cart.cartItems.set(productVariationId, {amount: cart.cartItems.get(productVariationId).amount + amount, productVariation: productVariation, product: product});
                            } else {
                                cart.cartItems.set(productVariationId, {amount: amount, productVariation: productVariation, product: product});
                            }
                            cart.save();
                            console.log(cart);
                            await done();
                            return res.json({cartItem : {amount: cart.cartItems.get(productVariationId).amount, productVariation: productVariation, product: product}, status: "success"});
                        } else {
                            await done();
                            return res.json({cartItem : {amount: cart.cartItems.get(productVariationId).amount, productVariation: productVariation, product: product}, status: "failed"});
                        }
                    } else {
                        return res.json({status: "failed"});
                    }
                })
            })
        });
    });
}

exports.removeProductFromCart = async function(req, res, next){
    cartId = req.body.cartId;
    productVariationId = req.body.productVariationId;
    productId = req.body.productId;
    amount = req.body.amount
    console.log("body.req", req.body);
    Cart.findById(cartId, async function(err, cart) { 
            ProductVariation.findById(productVariationId, async function(err, productVariation) {
                Product.findById(productId, async function(err, product){
                    console.log("product", product);
                    console.log("product Variation", productVariation);
                    console.log("cart", cart);
                    console.log("cart item", cart.cartItems.get(productVariationId));
                    if (!err) {
                            if(cart.cartItems.get(productVariationId)){
                                productVariation.stockAmount = productVariation.stockAmount + amount;
                                await productVariation.save();
                                console.log(productVariation);
                                cart.amount = cart.amount - amount;
                            
                                if( cart.cartItems.get(productVariationId).amount - amount == 0){
                                    await cart.cartItems.delete(productVariationId);    
                                    await cart.save();
                                    console.log(cart);
                                    return res.json({cartItem: {amount: 0, productVariation: productVariation, product: product}, status: "success"});       
                                } else {
                                    await cart.cartItems.set(productVariationId, {amount: cart.cartItems.get(productVariationId).amount - amount, productVariation: productVariation, product: product});
                                }
                                await cart.save();
                                console.log(cart);
                                return res.json({cartItem: {amount: cart.cartItems.get(productVariationId).amount, productVariation: productVariation, product: product}, status: "success"});       
                        }
                    } else {
                        return res.json({status: "failed"});
                    }
                })
            })
        
    });
}