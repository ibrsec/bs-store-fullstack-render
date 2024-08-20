"use strict";


const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      maxLength: 50,
    },
  },
  { collection: "category", timestamps: true }
);

module.exports.Category = mongoose.model("Category", categorySchema);
