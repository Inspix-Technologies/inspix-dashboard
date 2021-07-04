import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const UserAPI = {
  getUserData: async (token) => {
    try {
      const response = await API.get("/", {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log(response);
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },
};

export default UserAPI;
