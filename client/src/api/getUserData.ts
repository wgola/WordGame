import { userType } from "../types";
import API from "./axios";

export const getUserData = (): Promise<userType> => API.get("/user");
