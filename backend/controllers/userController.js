const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    async function main() {
      const info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Email Verification",
        html: `<p>Thanks for signing up! Click <a href="http://127.0.0.1:5173/verify/${user._id}" target="_blank">here</a> to get verified</p>`,
      });

      console.log("Message sent: %s", info.messageId);
    }

    const responseData = {
      token,
      email: user.email,
      isEnrolled: user.isEnrolled,
      isAdmin: user.isAdmin,
      name: user.name,
      image: user.image,
      id: user._id,
      isVerified: user.isVerified,
    };

    main().catch(console.error);
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (!user.isVerified) {
      return res.status(400).json({ error: "User is not verified" });
    }
    const token = createToken(user._id);

    const responseData = {
      token,
      email: user.email,
      isEnrolled: user.isEnrolled,
      isAdmin: user.isAdmin,
      name: user.name,
      image: user.image,
      id: user._id,
      isVerified: user.isVerified,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { image, name, password, newPassword } = req.body;
  const { id } = req.params;

  if (!password) {
    return res.status(400).json({ error: "Please provide current password" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "User is not valid" });
  }

  try {
    const user = await User.findById(id);

    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck) {
      return res.status(400).json({ error: "Current password is wrong" });
    }

    const token = createToken(user._id);

    if (user) {
      user.image = image || user.image;
      user.name = name || user.name;

      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        const updatedPassword = await bcrypt.hash(newPassword, salt);
        user.password = updatedPassword || user.password;
      }
    }
    const updatedUser = await user.save();

    const responseData = {
      email: updatedUser.email,
      isEnrolled: updatedUser.isEnrolled,
      isAdmin: updatedUser.isAdmin,
      name: updatedUser.name,
      image: updatedUser.image,
      id: updatedUser._id,
      isVerified: user.isVerified,
      token,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "User not found" });
  }

  try {
    const user = await User.findById(id);

    if (user) {
      user.isVerified = true;
    }
    const updatedUser = await user.save();

    const responseData = {
      email: updatedUser.email,
      isEnrolled: updatedUser.isEnrolled,
      isAdmin: updatedUser.isAdmin,
      name: updatedUser.name,
      image: updatedUser.image,
      id: updatedUser._id,
      isVerified: user.isVerified,
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
  updateProfile,
  verifyUser,
};
