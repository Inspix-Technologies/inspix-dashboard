import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

let currentToken = "";

const UserAPI = {
  getUserData: async (token) => {
    currentToken = token;
    try {
      const response = await API.get("/", {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },

  setUserData: async (userData, token) => {
    try {
      const response = await API.post("/", userData, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },
};

export default UserAPI;
