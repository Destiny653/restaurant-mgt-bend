const User = require("../models/user");
const Reservation = require("../models/reservation")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Get all reservations (OWNER ONLY)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("customer", "name email");
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Staff (OWNER ONLY)
exports.addStaff = async (req, res) => {
  try {
    const { name, email, password, salary } = req.body;

    const hashPassword = bcrypt.hash(password, 10)

    const newStaff = new User({
      name,
      email,
      password: hashPassword,
      role: "Staff",
      salary,
    });

    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.loginStaff = async(req, res)=>{
  try{
    const {email, password} = req.body 
    const user = await User.findOne({email:email})
    if(!user){
      res.status(401).json({success: false, message:"User not found" })
    }
    compare = await bcrypt.compare(password, user.password)
    if(!compare){
      res.status(401).json({success: false, message: "Invalid credentials."})
    }
    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.status(201).json({success:true, token, data: user})
  }catch(err){
    res.status(500).json({success: false, message:"Internal error: "+err.message})
  }
}

// Modify Staff Details (OWNER ONLY)
exports.modifyStaff = async (req, res) => {
  try {
    const updatedStaff = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStaff) return res.status(404).json({ success: false, message: "Staff member not found" });

    res.status(200).json({ success: true, data: updatedStaff });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Staff (OWNER ONLY)
exports.deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await User.findByIdAndDelete(req.params.id);
    if (!deletedStaff) return res.status(404).json({ success: false, message: "Staff member not found" });

    res.status(200).json({ success: true, message: "Staff member deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Modify Salary (OWNER ONLY)
exports.modifySalary = async (req, res) => {
  try {
    const { salary } = req.body;
    if (!salary || salary < 0) return res.status(400).json({ success: false, message: "Invalid salary amount" });

    const updatedStaff = await User.findByIdAndUpdate(req.params.id, { salary }, { new: true });
    if (!updatedStaff) return res.status(404).json({ success: false, message: "Staff member not found" });

    res.status(200).json({ success: true, message: "Salary updated", data: updatedStaff });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
