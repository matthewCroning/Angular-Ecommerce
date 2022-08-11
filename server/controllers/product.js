var AsyncLock = require('async-lock');
var lock = new AsyncLock();
const Product = require("../models/product");
const ProductVariation = require("../models/productVariation");
exports.findAll = function(req, res, next){  
    Product.find({}, function(err, products) {
        if (!err) { 
            return res.json(products);
        } else {
            throw err;
        }
    });
}

exports.find = function(req, res, next){  
    limit = req.params.limit;
    skip = req.params.page * limit;
    sort = req.params.sort;
    order = req.params.order;
    search = req.params.search;
    console.log(search);
    if(search === undefined){
        search = '';
    }
    search = { $regex: new RegExp(search, 'i') }
    console.log(search);
    Product.find({$or:[{"brand": search},{"name": search }]}).limit(limit).skip(skip).sort([[sort, order]]).populate({path: 'productVariations'}).exec(function(err, products) {
        if (!err) { 
            return res.json(products);
        } else {
            throw err;
        }
    });
}

exports.getCount = function(req, res, next){
    Product.count({}, function( err, count){
        return res.json(count);
    })
}

exports.findProductById = function(req, res, next){  
    var productId = req.params.productId; 
    Product.findById(productId).populate({path: 'productVariations'}).exec(function(err, product) {
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