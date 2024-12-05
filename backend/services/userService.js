const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../Tools/jwt");

exports.getUsersService = async () => {
  try {
    const user = await User.find({role: "user"});
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
exports.addUsers = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

exports.login = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Credentials required");
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("No user found");
    }
    if (!(await bcrypt.compare(password, findUser.password))) {
      return "invalid password";
    }
    const token = generateToken({ id: findUser._id, role: findUser.role });
    console.log("here");
    return {
      msg: "Logged in successfully",
      user: {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
      },
      token,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteUser = async (id) => {
  if (!id) {
    throw new Error("User ID not provided");
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error(err.message || "An error occurred while deleting the user");
  }
};

exports.editUser = async (body, id) => {
  try {
    const user = await User.findByIdAndUpdate(id, body);
    if(!user) throw new Error("User not found")
    return user
  } catch (err) {
    throw new Error(err.message || "An error occurred while editing the user");
  }
};
