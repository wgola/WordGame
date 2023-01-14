import users from "../models/users.model";
import bcrypt from "bcrypt";
import log from "../configs/logs.config";

const checkUserLogin = async (username: string, password: string) => {
  const user = await users.findOne({ username: username });

  if (user && (await bcrypt.compare(password, user.password))) {
    log.info(`User ${user.id} has correct login data`);
    return user;
  }

  log.warn(`Incorrect login data`);
  return null;
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

    log.info("Created new user");
    return true;
  } catch (e) {
    log.error("Couldn't create new user");
    return false;
  }
};

const findUserByID = async (userID: string) => {
  const foundUser = await users.findById(userID);

  if (foundUser) {
    log.info(`Found user ${userID}`);
    return foundUser;
  }

  log.warn(`Couldn't find user ${userID}`);
  return null;
};

const updateUserByID = async (
  userID: string,
  username: string,
  email: string,
  color: string
) => {
  const updatedUser = {
    username: username,
    email: email,
    color: color,
  };

  try {
    await users.findByIdAndUpdate(userID, updatedUser, { runValidators: true });

    log.info(`Updated user ${userID}`);
    return true;
  } catch (e) {
    log.error(`Couldn't update user ${userID}`);
    return false;
  }
};

const deleteUserByID = async (userID: string) => {
  try {
    await users.findByIdAndDelete(userID);

    log.info(`Deleted user ${userID}`);
    return true;
  } catch (e) {
    log.error(`Couldn't delete user ${userID}`);
    return false;
  }
};

export {
  checkUserLogin,
  createUser,
  findUserByID,
  updateUserByID,
  deleteUserByID,
};
