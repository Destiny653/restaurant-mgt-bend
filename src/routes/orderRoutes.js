const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // ✅ Ensure correct path
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/", authenticate, authorize(["Customer"]), orderController.placeOrder);
router.get("/", authenticate, authorize(["Customer"]), orderController.viewOrders);

module.exports = router;
