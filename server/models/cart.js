const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItems: {
        type: Map, 
        of: {
            amount: Number,
            product: { type: Schema.Types.ObjectId, ref: 'Product' }     
        }
    },
    lastAddedItemTime: Date,
    amount: Number
});

module.exports = mongoose.model("Cart", cartSchema);
