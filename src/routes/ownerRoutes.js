const express = require('express');
const router = express.Router(); 
const ownerController = require("../controllers/ownerController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

// All routes require authentication and owner role
router.use(authenticate);
router.use(authorize('Owner'));

// Dashboard
// router.get('/dashboard', ownerController.getDashboardStats);   
 
// ✅ Get all staff members
router.get("/staff", authenticate, authorize(["Owner"]), ownerController.getAllStaff);

// ✅ Update staff salary
router.put("/staff/:id", authenticate, authorize(["Owner"]), ownerController.updateStaff);

// ✅ Get total revenue
router.get("/revenue", authenticate, authorize(["Owner"]), ownerController.getRevenue);

module.exports = router;
