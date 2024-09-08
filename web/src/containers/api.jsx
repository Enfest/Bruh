import axios from "axios";

const instance = axios.create({
  baseURL: `http://10.0.2.2:5500/`,
  // baseURL: `http://localhost:5500/`,
});

export default instance;
