// @desc Logs request to  console
// Customise logger
// I will be using morgan third party
// server.js app.use(logger)
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocal}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
