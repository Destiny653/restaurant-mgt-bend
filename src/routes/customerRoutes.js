const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const reservation = require("../controllers/reservationController")
const { authenticate, authorize } = require("../middlewares/authMiddleware");


router.get("/", authorize(['Customer']), menuController.getMenu);
router.post("/register", reservation.registerCustomer)
router.post("login", reservation.loginCustomer)

module.exports = router;
