const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "User not found", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (er) {
    next(er);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ $or: [{ username }, { email }] });
    console.log(usernameCheck, "usernameCheckusernameCheck")
    if (usernameCheck)
      return res.json({ msg: "User already exist with this username or email", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (er) {
    next(er);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (er) {
    next(er);
  }
};

const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is mandatory" });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (er) {
    next(er);
  }
};
module.exports = { logOut, getAllUsers, register, login }