const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/login", staffController.loginStaff)
router.get("/reservations", authenticate, authorize(["Owner"]), staffController.getAllReservations);
router.post("/add", authenticate, authorize(["Owner"]), staffController.addStaff);
router.put("/:id", authenticate, authorize(["Owner"]), staffController.modifyStaff);
router.delete("/:id", authenticate, authorize(["Owner"]), staffController.deleteStaff);
router.put("/salary/:id", authenticate, authorize(["Owner"]), staffController.modifySalary);

module.exports = router;
