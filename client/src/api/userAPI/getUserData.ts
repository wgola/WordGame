import { userType } from "../../types";
import API from "../axios";

export const getUserData = async (): Promise<userType | null> => {
  try {
    const result = await API.get("/user");
    return result.data.userData;
  } catch {
    return null;
  }
};
