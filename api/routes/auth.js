var express = require("express");
var router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_HASH),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_HASH
    ).toString(CryptoJS.enc.Utf8);
    const input = req.body.password;
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    if (user === null) {
      res.status(401).json("Wrong Credentials");
    } else if (hashedPass != input) {
      res.status(401).json("Wrong Credentials");
    } else {
      res.status(200).json({ ...user._doc, accessToken });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
