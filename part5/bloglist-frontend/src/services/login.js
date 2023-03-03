import axios from "axios";

const baseUrl = "/api/login";

const login = async (username, password) => {
  const userInfo = {
    username: username,
    password: password
  };
  const response = await axios.post(baseUrl, userInfo);
  return response.data;
};

export default { login };