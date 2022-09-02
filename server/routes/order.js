const express = require("express");
const router = express.Router();
const Order = require("../controllers/order");

router.get("/findAll/:status", Order.findAll);

router.post("/create", Order.create);
router.post("/changeStatus/:orderId", Order.changeStatus);
module.exports = router;