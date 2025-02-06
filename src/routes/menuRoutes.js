const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/", authenticate, authorize(["Staff", "Owner"]), menuController.addMenuItem);
router.put("/:id", authenticate, authorize(["Staff", "Owner"]), menuController.modifyMenuItem);
router.delete("/:id", authenticate, authorize(["Staff", "Owner"]), menuController.deleteMenuItem); 
router.get("/", menuController.getMenu);

module.exports = router;
