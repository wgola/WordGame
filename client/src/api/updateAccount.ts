import { editFieldsTypes } from "../types";
import API from "./axios";

export const updateAccount = async (
  data: editFieldsTypes
): Promise<Boolean> => {
  try {
    await API.put("/user", data);
    return true;
  } catch (e) {
    return false;
  }
};
