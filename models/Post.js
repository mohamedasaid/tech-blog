const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,

  subtitle: String,

  content: String,

  username: String,

  image: String,

  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Post", PostSchema);
