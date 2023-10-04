const express = require("express");
const {
  loginUser,
  signupUser,
  getAllUsers,
  getSingleUser,
  enrollUser,
  updateProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getSingleUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.patch("/:id", authMiddleware, enrollUser);
router.patch("/profile/:id", authMiddleware, updateProfile);

module.exports = router;
