const Order = require("../models/order");

// Add Order
exports.addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Modify Order
exports.modifyOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Place an Order (CUSTOMER ONLY)
exports.placeOrder = async (req, res) => {
    try {
      const { items, totalAmount } = req.body;
  
      const newOrder = new Order({
        customer: req.user._id,
        items,
        totalAmount,
        status: "Pending",
      });
  
      await newOrder.save();
      res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
 

exports.viewOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate("items.menuItem", "name price");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};