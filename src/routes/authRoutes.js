const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register-owner', authController.registerOwner);
router.get('/owner', authController.getOwner)
router.post('/login', authController.loginOwner);

module.exports = router;
