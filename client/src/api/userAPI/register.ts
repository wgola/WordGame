import { registerFieldsTypes } from "../../types";
import API from "../axios";

export const register = async (data: registerFieldsTypes): Promise<boolean> => {
  try {
    await API.post("/user/register", data);
    return true;
  } catch (e) {
    return false;
  }
};
