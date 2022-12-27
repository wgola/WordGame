import { LoginFieldsTypes } from "../modules/LoginPage/LoginForm/types";
import API from "../axios";

export const login = async (data: LoginFieldsTypes) => {
  try {
    const user = await API.post("/user/login", data);
    return user.data.userData;
  } catch (e) {
    return null;
  }
};
