const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: Array },
    tags: {type: Array},
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    stock: {type: Number, default: 1},
    // inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
