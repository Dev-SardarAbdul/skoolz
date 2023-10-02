const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getAllUsers = async (req, res) => {
  const admin = req.user.isAdmin;

  if (!admin) {
    return res
      .status(400)
      .json({ error: "Only admins can fetch  user's data " });
  }
  const user = await User.find({ isAdmin: false }).sort({ createdAt: -1 });

  res.status(200).json(user);
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const admin = req.user.isAdmin;

  if (!admin) {
    return res
      .status(400)
      .json({ error: "Only admins can fetch  user's data " });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "User is not valid" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

const enrollUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "User is not valid" });
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { $set: { isEnrolled: true } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);

    const responseData = {
      token,
      email: user.email,
      isEnrolled: user.isEnrolled,
      isAdmin: user.isAdmin,
      name: user.name,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    const responseData = {
      token,
      email: user.email,
      isEnrolled: user.isEnrolled,
      isAdmin: user.isAdmin,
      name: user.name,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  signupUser,
  loginUser,
  enrollUser,
};
