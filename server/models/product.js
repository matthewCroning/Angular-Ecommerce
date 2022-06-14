const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number, 
  stockAmount: Number
});

module.exports = mongoose.model("Product", productSchema);
