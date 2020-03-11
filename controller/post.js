const Post = require("../models/Post");
const cloudinary = require("cloudinary");
//const ErrorCustomize = require("../utils/errorCustomize");

// @desc Get all Posts
// @route GET /api/v1/blog
// @access Public
exports.getPosts = async (req, res, next) => {
  const posts = await Post.find({});
  console.log(req.session);
  res.render("index", {
    posts
  });
};

// @desc Get a Posts by id
// @route GET /api/v1/blog/post/create
// @access Public

// Note to myself
// download body parser note to make
//  npm i body-parser
exports.creatPost = (req, res, next) => {
  //console.log(req.body);
  //console.log(req.files);

  if (
    !req.files ||
    !req.body.username ||
    !req.body.title ||
    !req.body.subtitle ||
    !req.body.content
  ) {
    return res.redirect("/api/v1/blog/posts/new");
  }
  // File-uploading

  const { image } = req.files;

  const uploadFile = `${process.env.FILE_UPLOAD_PATH}/${image.name}`;

  image.mv(uploadFile, error => {
    cloudinary.v2.uploader.upload(uploadFile, (error, result) => {
      Post.create(
        {
          ...req.body,
          image: image.name
        },
        (error, post) => {
          console.log(post);
          res.redirect("/api/v1/blog");
        }
      );
    });
  });
};

// @desc Get the about me page
// @route GET /api/v1/blog/about
// @access Public
exports.getAboutMe = (req, res, next) => {
  res.render("about");
};

// @desc Get the Contact page
// @route GET /api/v1/blog/contact
// @access Public
exports.getContact = (req, res, next) => {
  res.render("contact");
};

// @desc Get the Write page
// @route GET /api/v1/blog/posts/new
// @access Public
exports.getWriteBlogPage = (req, res, next) => {
  res.render("create");
};

// @desc Get the Posts by id
// @route GET /api/v1/blog/:id
// @access Public
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return new ErrorCustomize(
        `Post not found with that id of ${req.params.id}`,
        404
      );
    }
    res.render("post", {
      post
    });
  } catch (err) {
    next(err);
  }
};
