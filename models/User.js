const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide your username"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email."]
  },
  password: {
    type: String,
    required: [true, "Please provide your password."]
  }
});
UserSchema.plugin(passportLocalMongoose);
UserSchema.pre("save", function(next) {
  const user = this;

  bcrypt.hash(user.password, 10, function(error, encrypted) {
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);

//const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//   username: String,
//   email: String
// });

// const mongoose = require("mongoose");
// const bcryptj = require("bcryptjs");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please add a name"]
//   },

//   email: {
//     type: String,
//     required: [true, "Please add an email"],
//     unique: true,
//     match: [
//       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       "Please add a valid email"
//     ]
//   }
// });

// // Encrypt the password using bcrypt
// UserSchema.pre("save", async function() {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// Sign JWT and return secret key and expire key
// UserSchema.methods.getSignedJwtToken = function() {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE
//   });
//};

// Match user entered password to hashed password in database
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcryptj.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("User", UserSchema);
