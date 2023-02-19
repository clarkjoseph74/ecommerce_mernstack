const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
