var express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorized,
  verifyTokenAndAdmin,
} = require("./verifyToken");
var router = express.Router();
const CryptoJs = require("crypto-js");
const User = require("../models/User");
// UPDATE THE USER DATA
router.put("/:id", verifyTokenAndAuthorized, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_HASH
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("Error while updating user : " + error.message);
  }
});
// DELETE THE USER
router.delete("/:id", verifyTokenAndAuthorized, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully ...");
  } catch (error) {
    res.status(500).json("Error while deleting user + : " + error.message);
  }
});
//GET SPECIFIC USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error while getting user info : " + error.message);
  }
});
// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Error while getting user info : " + error.message);
  }
});

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
