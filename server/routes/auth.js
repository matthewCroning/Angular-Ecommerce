const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth = require("../controllers/auth");

router.post("/register", Auth.register);
router.post("/login", Auth.login);

module.exports = router;