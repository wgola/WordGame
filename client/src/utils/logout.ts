import API from "../axios";

export const logout = async () => {
  try {
    await API.post("/user/logout");
    return true;
  } catch (e) {
    return false;
  }
};
