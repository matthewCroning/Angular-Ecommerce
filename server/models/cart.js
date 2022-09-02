const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItems: {
        type: Map, 
        of: {
            amount: Number,
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            productVariation: { type: Schema.Types.ObjectId, ref: 'ProductVariation' }     
        }
    },
    lastAddedItemTime: Date,
    amount: Number
});

module.exports = mongoose.model("Cart", cartSchema);
