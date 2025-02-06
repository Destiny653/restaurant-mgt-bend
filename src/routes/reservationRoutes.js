const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { authenticate, authorize } = require("../middlewares/authMiddleware"); 
 
router.put("/:id", authenticate, authorize(["Staff", "Owner"]), reservationController.modifyReservation);  
router.post("/", authenticate, authorize(["Customer"]), reservationController.createReservation); 
router.get("/", authenticate, authorize(["Customer", "Owner", "Staff"]), reservationController.getAllReservations);
router.delete("/:id", authenticate, authorize(["Customer", "Owner"]), reservationController.deleteReservation);

module.exports = router; 
