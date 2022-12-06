const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.find({ id: request.params.id });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {

  const body = request.body;
  console.log(body);

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  // const user = await User.findById(body.userId);

  const blogObj = {
    name: body.name,
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  };

  const blog = new Blog(blogObj);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);

  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = String(request.params.id);
  await Blog.findByIdAndRemove({ _id: String(id) });
  response.status(204).end();

});


blogsRouter.put("/:id", async (request, response) => {
  const id = String(request.params.id);
  const body = request.body;

  const result = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: "query" });

  if (result) {
    response.json(result);
  } else {
    response.sendStatus(404);
  }

});

module.exports = blogsRouter;