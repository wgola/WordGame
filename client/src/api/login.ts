import { userType, loginFieldsTypes } from "../types";
import API from "./axios";

export const login = async (
  data: loginFieldsTypes
): Promise<userType | null> => {
  try {
    const user = await API.post("/user/login", data);
    return user.data.userData;
  } catch (e) {
    return null;
  }
};
