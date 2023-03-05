import axios from "axios";


const baseUrl = "/api/users";

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll };
