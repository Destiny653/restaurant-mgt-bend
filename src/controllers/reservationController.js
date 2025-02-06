const Reservation = require("../models/reservation");
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwy = require('jsonwebtoken')

// Make a Table Reservation (CUSTOMER ONLY)
exports.modifyReservation = async (req, res) => {
  try {
    const { status } = req.body;
    const {id} = req.params

    const newReservation = await Reservation.findByIdAndUpdate(id, {status},  { new: true, runValidators: true })
    res.status(201).json({ success: true, message:"Reservation update successfull.", data: newReservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// View All Reservations (For Customers)
exports.viewReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ customer: req.user._id });
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const {tableNumber, date, time, guests} = req.body;

    const newReservation = new Reservation({
      customer: req.user._id,
      tableNumber,
      date,
      time,
      guests,
      status: "Pending",
    });

    await newReservation.save();
    res.status(201).json({ success: true, data: newReservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("customer", "name phone");
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// register customer
exports.registerCustomer = async(req, res)=>{ 
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Customer",
    })
    await newCustomer.save();
    res.status(201).json({ success: true, message: "Customer registered successfully",
      data: newCustomer,
     });
     } catch (error) {
       res.status(400).json({ success: false, message: error.message });
     }
}

exports.loginCustomer = async(req, res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }
    const token =  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
