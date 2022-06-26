var AsyncLock = require('async-lock');
var lock = new AsyncLock();
const Product = require("../models/product");

exports.findAll = function(req, res, next){  
    Product.find({}, function(err, products) {
        if (!err) { 
            return res.json(products);
        } else {
            throw err;
        }
    });
}

exports.findProductById = function(req, res, next){  
    var productId = req.params.productId; 
    Product.findById(productId, function(err, product) {
        if (!err) { 
            return res.json(product);
        } else {
            throw err;
        }
    });
}

exports.findProductsByIds = function(req, res, next){  
    var productIds = req.body.productIds; 
    console.log(productIds);
    Product.find().where('_id').in(productIds).exec(function(err, product){
        if (!err) { 
            return res.json(product);
        } else {
            throw err;
        }
    });
}

exports.create = function(req, res, next){
    var product = req.body.product;
    console.log(product);
    var newProduct = new Product(product);
    newProduct.save();
    return res.json({product: newProduct, message: "successfully created new product"});
}

exports.reduceStock = async function(req, res, next){
    
}

exports.increaseStock = async function(req, res, next){
    var productId = req.params.productId; 
    lock.acquire(productId, async function(done) { 
        Product.findById(productId, async function(err, product) {
            if (!err) {
                await product.stockAmount++;
                await product.save();
                console.log(product, "success");
                done();
                return res.json({product: product, status: "success"});
            } else {
                return res.json({status: "failed"});
            }
        })
    });
}