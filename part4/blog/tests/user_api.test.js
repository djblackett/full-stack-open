const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");


const api = supertest(app);

const initialUsers = [
  { name: "Bob",
    username: "bobthedude22",
    password: "notagoodpassword"
  },
  { name: "Reggie",
    username: "reggiethedude",
    password: "notagoodpasswordeither"
  },
];

beforeEach(async () => {

  await User.deleteMany({});

  const userObjects = initialUsers.map(user => new User(user));
  const promiseArray = userObjects.map(user => user.save());
  await Promise.all(promiseArray);
}, 100000);


describe("testing user database", () => {

  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("two users are returned", async () => {
    const response = await api.get("/api/users");
    expect(200);
    expect(response.body).toHaveLength(initialUsers.length);
  });
});


describe("adds a valid formatted user to database", () => {

  test("id property exists", async () => {
    const response = await api.get("/api/users");
    const user = response.body[0];
    expect(user.id).toBeDefined();
  });

  test("successfully adds one user to database", async () => {
    const sample = {
      username: "Neo",
      password: "iAmTheOne"
    };

    const newUser = new User(sample);
    const postResult = await newUser.save();
    const getResult = await api.get("/api/users");

    expect(getResult.body).toHaveLength(3);
    expect(postResult.username).toBe(sample.username);
    expect(postResult.password).toBe(sample.password);
  });



  // test("Adding a blog without likes value defaults to 0", async () => {
  //   const sample = {
  //     title:"I am a new blog being added to the database",
  //     author:"Mister Tester Man",
  //     url:"https://bloggityblogblog.org/supercooolblog"
  //   };
  //
  //   const newUser = new User(sample);
  //   const postResult = await newUser.save();
  //   expect(postResult.likes).toBe(0);
  // });

});


describe("adding an invalid user returns proper error message", () => {
  test("missing username or password returns 400 bad request", async () => {
    const noUsername = {
      password: "iLiveInATree"
    };

    const noPassword = {
      username: "Neo"
    };

    await api.post("/api/users").send(noUsername).expect(400);
    await api.post("/api/users").send(noPassword).expect(400);
  });

});


test("successfully deletes a blog from DB", async () => {
  const getAllUsers = await api.get("/api/users");
  const firstBlog = getAllUsers.body[0];
  const firstBlogId = firstBlog.id;

  await api.delete(`/api/users/${firstBlogId}`);

  const usersAfterDeletion = await api.get("/api/users");
  const blogUrls = usersAfterDeletion.body.map(blog => blog.url);

  expect(204);
  expect(usersAfterDeletion.body.length).toBe(initialUsers.length - 1);
  expect(blogUrls).not.toContain(firstBlog.url);
});


test("Successfully updates a blog", async () => {
  const getAllUsers = await api.get("/api/users");
  const firstBlog = getAllUsers.body[0];
  const firstBlogId = String(firstBlog.id);

  const updated = await api.put(`/api/users/${firstBlogId}`).send({ title: firstBlog.title, url: firstBlog.url, author: firstBlog.author, likes: 12345678 }, { new: true });

  expect(updated.body.likes).toBe(12345678);
});




afterAll(() => {
  mongoose.connection.close();
});