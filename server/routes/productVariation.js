const express = require("express");
const router = express.Router();
const ProductVariation = require("../controllers/productVariation");
const Auth = require("../controllers/auth");

router.post("/create/:productId",  Auth.isAdmin, ProductVariation.create);

module.exports = router;