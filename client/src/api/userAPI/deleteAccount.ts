import API from "../axios";

export const deleteAccount = async (): Promise<boolean> => {
  try {
    await API.delete("/user");
    return true;
  } catch (e) {
    return false;
  }
};
