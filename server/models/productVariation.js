const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productVariationSchema = new Schema({
  price: {type: Number},
  colour: {type: String},
  images: [{type: String}],
  stockAmount: {type: Number},
  product: {type: Schema.Types.ObjectId, ref: 'Product'}, 
});

module.exports = mongoose.model("ProductVariation", productVariationSchema);