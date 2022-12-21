import { LoginFieldsTypes } from "../modules/LoginPage/LoginForm/types";
import API from "../axios";

export const login = async (data: LoginFieldsTypes) => {
  return await API.post("/user/login", data);
};
