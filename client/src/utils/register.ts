import { RegisterFieldsTypes } from "../modules/RegisterPage/RegisterForm/types";
import API from "../axios";

export const register = async (data: RegisterFieldsTypes) => {
  return await API.post("/user/register", data);
};
