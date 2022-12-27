import API from "../axios";

export const getUserData = () => API.get("/user");
