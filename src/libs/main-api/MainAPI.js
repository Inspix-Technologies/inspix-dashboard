import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://172.200.0.2",
  withCredentials: true,
});

export default baseAxios;
