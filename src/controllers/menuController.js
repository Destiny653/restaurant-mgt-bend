const MenuItem = require("../models/menuItem");

// Add Menu Item
exports.addMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Modify Menu Item
exports.modifyMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ success: false, message: "Menu item not found" });

    res.status(200).json({ success: true, message:"Menu updated sucessfully.", data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ success: false, message: "Menu item not found" });

    res.status(200).json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMenu = async (req, res) => {
    try {
      const menuItems = await MenuItem.find();
      res.status(200).json({ success: true, data: menuItems });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };