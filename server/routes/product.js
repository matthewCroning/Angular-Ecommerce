const express = require("express");
const router = express.Router();
const Product = require("../controllers/product");
const Auth = require("../controllers/auth");

router.get("/findAll", Product.findAll);
router.get("/find/:limit/:page/:sort/:order/:search", Product.find);
router.get("/find/:limit/:page/:sort/:order", Product.find);
router.get("/findProductById/:productId", Product.findProductById);
router.get("/getCount", Product.getCount);
router.post("/findProductsByIds", Product.findProductsByIds);

router.get("/reduceStock/:productId", Product.reduceStock);
router.get("/increaseStock/:productId", Product.increaseStock);



router.post("/create", Auth.isAdmin, Product.create);

router.post("/delete", Product.delete);
module.exports = router;