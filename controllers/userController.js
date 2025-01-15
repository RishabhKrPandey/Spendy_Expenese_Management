const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new userModel({ name, email, password });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { loginController, registerController };
