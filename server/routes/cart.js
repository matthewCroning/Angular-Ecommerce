const express = require("express");
const router = express.Router();
const Cart = require("../controllers/cart");

// router.post("/register", Auth.register);
// router.post("/login", Auth.login);
router.get("/createCart", Cart.create);
router.get("/getCart/:cartId", Cart.getCart);

router.post("/addProductToCart", Cart.addProductToCart);
router.post("/removeProductFromCart", Cart.removeProductFromCart);
module.exports = router;