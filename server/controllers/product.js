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
    Product.find({$or:[{"brand": search},{"name": search }]}).collation({locale: "en" }).limit(limit).skip(skip).sort([[sort, order]]).populate({path: 'productVariations'}).exec(function(err, products) {
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
    console.log(productId);
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

exports.create = async function(req, res, next){
    var product = req.body.product;
    var productVariation = req.body.productVariation;
    
    product.productVariations = [];
    var newProduct = await new Product(product);
    productVariation.product = newProduct._id;
    var newProductVariation = await new ProductVariation(productVariation);
    await newProduct.productVariations.push(newProductVariation);  
    await newProduct.save();
    await newProductVariation.save();
    console.log(newProduct._id);
    return res.json({product: newProduct, message: "successfully created new product"});
}

exports.edit = async function(req, res, next){
    const entries = Object.keys(req.body.product)
    const updates = {}

    console.log(req.body);
    console.log(req.params);
    // constructing dynamic query
    
    for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body.product)[i]
    }

    Product.updateOne({"_id": req.params.productId} , { $set: updates }).exec(function (err , success) {
        if(err){
            return res.json("error " + err);
        } else {
            console.log(success);
            return res.json("success");
        }
    })
}


exports.delete = async function(req, res, next){
    productId = req.body.productId;
    const doc = await Product.findOne({"_id": productId});
    await doc.deleteOne();
    return res.json("deleted");
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