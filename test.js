Post.create(
  {
    title: "My second blog post",
    description: "Second Blog post description",
    content: "Second Lorem ipsum content."
  },
  (error, post) => {
    console.log(error, post);
  }
);

// Files from the router before adding controller

// router.get("/", async (req, res) => {
//   const posts = await Post.find({});
//   res.render("index", {
//     posts
//   });
// });

// router.get("/", async (req, res) => {
//   const posts = await Post.find({});

//   //console.log(posts);

//   res.render("index", {
//     posts
//   });
// });

// router.get("/about", (req, res) => {
//   res.render("about");
// });

// router.get("/post/:id", async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   res.render("post", {
//     post
//   });
// });

// router.get("/contact", (req, res) => {
//   res.render("contact");
// });

// router.get("/posts/new", (req, res) => {
//   res.render("create");
// });

// // post method to put the data in the database
// // download body parser note to make
// // npm i body-parser
// router.post("/posts/create", (req, res) => {
//   //console.log(req.body);
//   Post.create(req.body, (error, post) => {
//     res.redirect("/api/v1/blog");
//   });
// });

// From the server.js

// app.get("/api/v1/blog", async (req, res) => {
//   const posts = await Post.find({});
//   res.render("index", {
//     posts
//   });
// });

// app.get("/", async (req, res) => {
//   //res.sendFile(path.resolve(__dirname, "pages/index.html"));
//   const posts = await Post.find({});

//   console.log(posts);

//   res.render("index", {
//     posts
//   });
// });

// app.get("/about", (req, res) => {
//   //res.sendFile(path.resolve(__dirname, "pages/about.html"));
//   res.render("about");
// });

// app.get("/post/:id", async (req, res) => {
//   //res.sendFile(path.resolve(__dirname, "pages/post.html"));
//   const post = await Post.findById(req.params.id);
//   res.render("post", {
//     post
//   });
// });

// app.get("/contact", (req, res) => {
//   //res.sendFile(path.resolve(__dirname, "pages/contact.html"));
//   res.render("contact");
// });

// app.get("/posts/new", (req, res) => {
//   res.render("create");
// });

// // post method to put the data in the database
// // download body parser note to make
// // npm i body-parser
// app.post("/posts/store", (req, res) => {
//   console.log(req.body);
//   Post.create(req.body, (error, post) => {
//     res.redirect("/");
//   });
// });

// app.listen(3000, () => {
//   console.log("App listen on port 3000");
// });
