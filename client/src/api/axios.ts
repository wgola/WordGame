import axios from "axios";

export default axios.create({
  baseURL: `http://${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});
