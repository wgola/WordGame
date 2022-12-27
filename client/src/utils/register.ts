import { RegisterFieldsTypes } from "../modules/RegisterPage/RegisterForm/types";
import API from "../axios";

export const register = async (data: RegisterFieldsTypes) => {
  try {
    await API.post("/user/register", data);
    return true;
  } catch (e) {
    return false;
  }
};
