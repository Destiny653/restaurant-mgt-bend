const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message'
  },
  role: {
    type: String,
    enum: ["Owner", "Staff", "Customer"],
    default: "Customer",
  },
  salary: {
    type: Number,
    required: function () {
      return this.role === "Staff";
    },
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
