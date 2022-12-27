import users from "../models/users.model";
import bcrypt from "bcrypt";

const checkUserLogin = async (username: string, password: string) => {
  const user = await users.findOne({ username: username });
  return user !== null && (await bcrypt.compare(password, user.password))
    ? user
    : null;
};

const createUser = async (
  username: string,
  password: string,
  email: string,
  color: string
) => {
  const user = {
    username: username,
    password: await bcrypt.hash(password, parseInt(process.env.BCRYPT_SECRET)),
    email: email,
    color: color,
  };
  try {
    await users.create(user);
    return true;
  } catch (e) {
    return false;
  }
};

const findUserByID = async (userID: string) => await users.findById(userID);

export { checkUserLogin, createUser, findUserByID };
