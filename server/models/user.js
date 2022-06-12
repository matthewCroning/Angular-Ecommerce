const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: String,
  email: {type: String,
          unique: true,
          lowercase: true,
          required: 'Email address is required',
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  password: {type: String, required: 'Email address is required'},
});

userSchema.methods.isSamePassword = function(requestedPassword){
  return bcrypt.compareSync(requestedPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);
