const User = require("../models/user");
const Order = require("../models/order"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

// ✅ Register an Owner
// exports.registerOwner = async (req, res) => {
//   try {
//     const { name, phone, password } = req.body;

//     // Check if an owner already exists
//     const existingOwner = await User.findOne({ role: "Owner" });
//     if (existingOwner) {
//       return res.status(400).json({ success: false, message: "An owner already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create owner
//     const owner = new User({
//       name,
//       phone,
//       password: hashedPassword,
//       role: "Owner",
//     });

//     await owner.save();
//     res.status(201).json({ success: true, data: owner });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// ✅ Get All Staff Members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "Staff" }).select("-password"); // Exclude password
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Staff Salary
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { salary } = req.body;

    // Find and update staff member
    const updatedStaff = await User.findByIdAndUpdate(
      id,
      { salary },
      { new: true, runValidators: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ success: false, message: "Staff member not found" });
    }

    res.status(200).json({ success: true,message: "Staff member updated",  data: updatedStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Total Revenue
exports.getRevenue = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.status(200).json({ success: true, data: { totalRevenue } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
