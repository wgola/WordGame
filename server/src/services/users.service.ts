import users from "../models/users.model";
import bcrypt from "bcrypt";

const chechUserLogin = async (username: string, password: string) => {
  const user = await users.findOne({ username: username });
  if (user === null) return null;
  else {
    return (await bcrypt.compare(password, user.password)) ? user : null;
  }
};

const createUser = async (
  username: string,
  password: string,
  email: string,
  color: string
) => {
  const user = {
    username: username,
    password: password,
    email: email,
    color: color,
  };
  try {
    await users.create(user);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { chechUserLogin, createUser };
