const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=826&t=st=1676458242~exp=1676458842~hmac=e7be5684c1770a7f11b79c9182c20909df28ddb54fcd0f3b6542c2883e2cccca",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
