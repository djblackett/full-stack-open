const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title:"Blooog",
    author:"Me",
    url:"https://bloggityblogblog.org",
    likes:"200059"
  },
  {
    title:"The ultimate blog",
    author:"Mel Dude",
    url:"https://bloggityblogblog.org/testblog123",
    likes:"2244"
  },
];



beforeEach(async () => {

  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
}, 100000);


describe("When some initial notes are already saved", () => {

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("two blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(200);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

});

describe("adds a valid formatted blog to database", () => {

  test("id property exists", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    expect(blog.id).toBeDefined();
    // console.log(response.data);
  });

  test("successfully adds one blog to database", async () => {
    const sample = {
      title: "I am a new blog being added to the database",
      author: "Mister Tester Man",
      url: "https://bloggityblogblog.org/supercooolblog",
      likes: "69"
    };

    const newBlog = new Blog(sample);
    const postResult = await newBlog.save();
    const getResult = await api.get("/api/blogs");

    expect(getResult.body).toHaveLength(3);
    expect(postResult.title).toBe(sample.title);
    expect(postResult.author).toBe(sample.author);
    expect(postResult.url).toBe(sample.url);
    expect(postResult.likes).toBe(Number(sample.likes));
  });



  test("Adding a blog without likes value defaults to 0", async () => {
    const sample = {
      title:"I am a new blog being added to the database",
      author:"Mister Tester Man",
      url:"https://bloggityblogblog.org/supercooolblog"
    };

    const newBlog = new Blog(sample);
    const postResult = await newBlog.save();
    expect(postResult.likes).toBe(0);
  });

});


describe("adding an invalid blog returns proper error message", () => {
  test("missing title or url returns 400 bad request", async () => {
    const noTitle = {
      author: "Mister Tester Man with no title",
      url: "https://bloggityblogblog.org/supercooolblog"
    };

    const noUrl = {
      title: "I am a new blog being added to the database without a URL",
      author: "Mister Tester Man",
    };

    await api.post("/api/blogs", noTitle).expect(400);
    await api.post("/api/blogs", noUrl).expect(400);
  });

});


test("successfully deletes a blog from DB", async () => {
  const getAllBlogs = await api.get("/api/blogs");
  const firstBlog = getAllBlogs.body[0];
  const firstBlogId = firstBlog.id;

  await api.delete(`/api/blogs/${firstBlogId}`);

  const blogsAfterDeletion = await api.get("/api/blogs");
  const blogUrls = blogsAfterDeletion.body.map(blog => blog.url);

  expect(204);
  expect(blogsAfterDeletion.body.length).toBe(initialBlogs.length - 1);
  expect(blogUrls).not.toContain(firstBlog.url);
});


test("Successfully updates a blog", async () => {
  const getAllBlogs = await api.get("/api/blogs");
  const firstBlog = getAllBlogs.body[0];
  const firstBlogId = String(firstBlog.id);

  const updated = await api.put(`/api/blogs/${firstBlogId}`).send({ title: firstBlog.title, url: firstBlog.url, author: firstBlog.author, likes: 12345678 }, { new: true });

  expect(updated.body.likes).toBe(12345678);
});


afterAll(() => {
  mongoose.connection.close();
});