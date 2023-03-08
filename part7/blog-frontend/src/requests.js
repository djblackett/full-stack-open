import axios from "axios";

const getTokenFromLS = () => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.token;
  }
};

const config = (token) => {
  return {
    headers: {
      Authorization: "bearer " + token,
    },
  };
};

export const getAllBlogs = () =>
  axios.get("/api/blogs", config(getTokenFromLS())).then((res) => res.data);

export const getAllUsers = () =>
  axios.get("/api/users", config(getTokenFromLS())).then((res) => res.data);

export const createBlog = async (newBlog) =>
  await axios
    .post("/api/blogs", newBlog, config(getTokenFromLS()))
    .then((res) => res.data);
export const updateBlog = async (newBlog) => {
  await axios
    .put(`/api/blogs/${newBlog.id}`, newBlog, config(getTokenFromLS()))
    .then((res) => res.data);
};

export const deleteBlog = async (id) => {
  await axios
    .delete(`/api/blogs/${id}`, config(getTokenFromLS()))
    .then((res) => res.data);
};

export const addComment = async (newBlog) => {
  await axios
    .put(`/api/blogs/${newBlog.id}`, newBlog, config(getTokenFromLS()))
    .then((res) => res.data);
};
