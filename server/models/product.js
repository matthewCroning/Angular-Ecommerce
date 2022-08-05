const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  name: String,
  tag: [{ type: String }],
  description: String,
  images: [{ type: String}],
  price: Number, 
  stockAmount: Number
});

module.exports = mongoose.model("Product", productSchema);
