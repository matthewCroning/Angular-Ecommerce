const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderItems: [{
        amount: Number,
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        productVariation: { type: Schema.Types.ObjectId, ref: 'ProductVariation' }     
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },  
    orderTime: Date,
    status: String,
    totalPrice: Number,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    payment: String,
    deliveryAddress: String,
    deliveryType: String

});

module.exports = mongoose.model("Order", orderSchema);
