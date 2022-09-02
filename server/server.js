const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      User        = require("./models/user");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const productVariationRoutes = require("./routes/productVariation");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const PORT = process.env.PORT || '3001';

app.use(bodyParser.json());
app.use("/api/auth", authRoutes),
app.use("/api/cart", cartRoutes),
app.use("/api/order", orderRoutes),
app.use("/api/product", productRoutes),
app.use("/api/productVariation", productVariationRoutes);

app.listen(PORT, function(){
});

mongoose.connect("mongodb://localhost:27017/angular-ecommerce").then(() => {
    console.log("mongoose logged in");
    console.log("Node server started on port " + PORT);
});