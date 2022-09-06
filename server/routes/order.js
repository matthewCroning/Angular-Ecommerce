const express = require("express");
const router = express.Router();
const Order = require("../controllers/order");
const Auth = require("../controllers/auth");


router.get("/findAll/:status", Order.findAll);
router.get("/findOrdersByUser", Auth.authMiddleware, Order.findOrdersByUser)
router.get("/findOrder/:orderId", Auth.authMiddleware, Order.findOrder)


router.post("/create", Auth.authMiddleware, Order.create);
router.post("/changeStatus/:orderId", Order.changeStatus);
module.exports = router;