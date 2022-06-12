const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      User        = require("./models/user");

const authRoutes = require("./routes/auth");  

const PORT = process.env.PORT || '3001';

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, function(){
});

mongoose.connect("mongodb://localhost:27017/angular-ecommerce").then(() => {
    console.log("mongoose logged in");
    console.log("Node server started on port " + PORT);
});