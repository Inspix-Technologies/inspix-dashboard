import baseAxios from "libs/main-api/MainAPI";

let currentToken = "";

const UserAPI = {
  getUserData: async (token) => {
    currentToken = token;
    try {
      const response = await baseAxios.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },

  setUserData: async (userData, token) => {
    try {
      const response = await baseAxios.post("/", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
  },
};

export default UserAPI;
