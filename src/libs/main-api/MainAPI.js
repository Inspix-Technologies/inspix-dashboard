import axios from "axios";
import getConfig from "config.global";

const CONFIG = getConfig()

const baseAxios = axios.create({
  baseURL: CONFIG.BACKEND_URL,
  withCredentials: true,
});

export default baseAxios;
