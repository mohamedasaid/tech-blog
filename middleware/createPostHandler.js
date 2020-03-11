
const createPostHandler = (req, res, next) => {
  if (!req.files.image) {
    return res.redirect("/posts/new");
  }
  next();
};


module.exports = createPostHandler;