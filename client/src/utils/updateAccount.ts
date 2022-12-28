import { EditFieldsTypes } from "../modules/EditAccountPage/EditAccountForm/editTypes";
import API from "../axios";

export const updateAccount = async (data: EditFieldsTypes) => {
  try {
    await API.put("/user", data);
    return true;
  } catch (e) {
    return false;
  }
};
