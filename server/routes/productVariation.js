const express = require("express");
const router = express.Router();
const ProductVariation = require("../controllers/productVariation");

router.post("/create/:productId", ProductVariation.create);

module.exports = router;