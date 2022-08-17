const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  name: String,
  tag: [{ type: String }],
  description: String,
  productVariations: [{ type: Schema.Types.ObjectId, ref: 'ProductVariation' }] 
  
});

productSchema.pre('deleteOne',  { document: true, query: false}, function(next) {
  console.log(this);
  this.model('ProductVariation').deleteMany({ product: this }).exec();
  next();
});

module.exports = mongoose.model("Product", productSchema);