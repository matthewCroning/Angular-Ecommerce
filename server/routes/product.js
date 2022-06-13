const express = require("express");
const router = express.Router();
const Product = require("../controllers/product");

router.get("/findAll", Product.findAll);

router.post("/create", Product.create);

module.exports = router;