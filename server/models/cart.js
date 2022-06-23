const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItems: {
        type: Map, 
        of: Number
    },
    lastAddedItemTime: Date,
    amount: Number
});

module.exports = mongoose.model("Cart", cartSchema);
