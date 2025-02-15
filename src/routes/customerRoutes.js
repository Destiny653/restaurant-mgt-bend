const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const reservation = require("../controllers/reservationController")
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const { sendMessage } = require("../controllers/messageController");


router.get("/", authorize(['Customer']), menuController.getMenu);
router.post("/register", reservation.registerCustomer)
router.post("/login", reservation.loginCustomer)
router.post("/message", authenticate, authorize(['Customer']), sendMessage)

module.exports = router;
