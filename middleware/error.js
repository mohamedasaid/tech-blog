const ErrorCustomize = require("../utils/errorCustomize");

// Error handler express
// Catching Errors
//https://expressjs.com/en/guide/error-handling.html

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Testing purpose
  console.log(err.stack.red);

  console.log(err.name);

  // Mongoose bad object
  if (err.name === "CastError") {
    const message = `Post not found with that id of ${err.value}`;
    error = new ErrorCustomize(message, 404);
    //res.render("error");
  }

  res.status(error.statusCode || 500).send({
    success: false,

    error: error.message || "Server Error"
  });

  //res.render("error", { error: err.stack || "Server Error" });
};

module.exports = errorHandler;
