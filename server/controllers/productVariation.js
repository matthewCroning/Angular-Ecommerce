
const ProductVariation = require("../models/productVariation");
const Product = require("../models/product");
const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
 secretAccessKey: process.env.SECRET_KEY, 
 accessKeyId: process.env.ACCESS_KEY,
 region: 'ap-southeast-2' //E.g us-east-1
});


const s3 = new aws.S3();

exports.deleteImage = async function(req, res, next){  
    productVariationId = req.params.productVariationId;
    image = req.body.image;

    await ProductVariation.updateOne({ id: productVariationId }, {
        $pull: {
            images: image,
        },
    }).exec( function(err, productVariation){
        console.log(productVariation);
    });

}

function deleteFromAWS(req, res, next) {
    var params = {  Bucket: process.env.BUCKET, Key: req.body.object };

    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack);  // error
        else     console.log();                 // deleted
    });

    return res.json("completed")

}

exports.deleteFromAWS = deleteFromAWS;
//cdn.shopify.com/s/files/1/0024/9803/5810/products/590591-Product-0-I-637902093777411378_e1dc551a-5a95-42ff-bcd3-8d50d279ac00_800x800.jpg?v=1660690595"
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

exports.delete = async function(req, res, next){
    var productVariationId = req.body.productVariationId;

    ProductVariation.deleteOne({"_id": productVariationId}).exec(async function(err, deleted){
        return res.json(deleted);
    });
}