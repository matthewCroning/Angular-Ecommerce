const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  name: String,
  tag: [{ type: String }],
  description: String,
  productVariations: [{ type: Schema.Types.ObjectId, ref: 'ProductVariation' }] 
  
});

module.exports = mongoose.model("Product", productSchema);