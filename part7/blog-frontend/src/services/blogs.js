import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const createAuthToken = () => {
  return {
    headers: {
      Authorization: "bearer " + token,
    },
  };
};

const getAll = async () => {
  const config = createAuthToken(token);
  try {
    const request = await axios.get(baseUrl, config);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (newBlog) => {
  try {
    const request = await axios.post(baseUrl, newBlog, createAuthToken());
    console.log(token);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (id, comment) => {
  try {
    const request = await axios.post(
      `${baseUrl}/${String(id)}/comments`,
      comment,
      createAuthToken()
    );

    console.log(token);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (id, newBlog) => {
  try {
    const request = await axios.put(
      `/api/blogs/${String(id)}`,
      newBlog,
      createAuthToken()
    );
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const removeBlog = async (id) => {
  try {
    await axios.delete(`/api/blogs/${id}`, createAuthToken());
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog,
  removeBlog,
  addComment,
  createAuthToken,
};
