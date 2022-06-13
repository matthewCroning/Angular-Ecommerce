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

exports.create = function(req, res, next){
    var product = req.body.product;
    
    var newProduct = new Product(product);
    newProduct.save();
    return res.json(newProduct);
}