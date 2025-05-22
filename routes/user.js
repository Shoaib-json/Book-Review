const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../utils/middleware");
const cookieParser = require("cookie-parser");


router.get("/signIn", (req, res) => {
  res.render("sign");
});

router.post("/create", async (req, res) => {
  const { email, password, user } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      user,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ msg: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Sign-up error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/log", (req, res) => {
  res.render("login");
});

router.post("/log", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.user,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "10h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
    });


    res.redirect("/books"); 

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/user/log"); 
});

module.exports = router;
