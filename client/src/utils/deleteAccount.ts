import API from "../axios";

export const deleteAccount = async () => {
  try {
    await API.delete("/user");
    return true;
  } catch (e) {
    return false;
  }
};
