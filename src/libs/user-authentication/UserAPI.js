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
      console.log(response);
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },

  setUserName: async (name) => {
    try {
      const response = await API.post(
        "/",
        {
          name: name,
        },
        {
          headers: {Authorization: `Bearer ${currentToken}`},
        }
      );
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },
};

export default UserAPI;
