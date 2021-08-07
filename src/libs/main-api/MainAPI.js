import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://dashboard.inspix.tech:8000",
  withCredentials: true,
});

export default baseAxios;
