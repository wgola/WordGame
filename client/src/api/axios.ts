import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000/" : "";

export default axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
