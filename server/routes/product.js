const express = require("express");
const router = express.Router();
const Product = require("../controllers/product");

router.get("/findAll", Product.findAll);
router.get("/findProductById/:productId", Product.findProductById);
router.post("/findProductsByIds", Product.findProductsByIds);

router.get("/reduceStock/:productId", Product.reduceStock);
router.get("/increaseStock/:productId", Product.increaseStock);



router.post("/create", Product.create);

module.exports = router;