
const ProductVariation = require("../models/productVariation");
const Product = require("../models/product");

exports.create = async function(req, res, next){  
    var productId = req.params.productId;
    var productVariation = req.body.productVariation;
    await Product.findById(productId).exec(async function(err,product){
        newProductVariation = new ProductVariation(productVariation);
        await newProductVariation.save();
        await product.productVariations.push(newProductVariation);
        await product.save();
        return res.json({product: newProductVariation, message: "successfully created new product variation for " + productId});
    });
    
}