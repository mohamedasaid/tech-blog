const express = require("express");
const dotenv = require("dotenv");

const colors = require("colors");
const { engine } = require("express-edge");
const edge = require("edge.js");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("./config/db");
const Post = require("./models/Post");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectFlash = require("connect-flash");
const cloudinary = require("cloudinary");
const passport = require("passport");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const User = require("./models/User");
const connMongo = require("connect-mongo");

const fileupload = require("express-fileupload");

const app = new express();

// Routes file
const post = require("./routes/post");
const auth = require("./routes/auth");
//const login = require("./routes/login");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDB();

// Connect-mongo to the expression session
const mongoSessionData = connMongo(session);

// Configure passport Sessions
app.use(
  session({
    secret: "pasword ten",
    resave: false,
    saveUninitialized: true,
    store: new mongoSessionData({
      mongooseConnection: mongoose.connection,
      collection: "session"
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// folder for the public
app.use(express.static("public"));

app.use(express.json());

// Cloudinary
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
});

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File-uploading
app.use(fileupload());

// Post.find({}, (error, posts) => {
//   //console.log(error, posts);
// });
// Express edge
app.use(engine);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

// Mount routers
app.use("/api/v1/blog", post);
app.use("/api/v1/auth", auth);
//app.post("/api/v1/auth/users/login", loginUser);
//app.use("/api/v1/auth", login);

//app.use((req, res) => res.render("error"));

//app.use("/posts/create", errorHandler);

// Middleware is executed by linear order so it has to be after the api
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  // console.log(`Error: ${err.message}`.red);
  // Close server and exit
  server.close(() => process.exit(1));
});
