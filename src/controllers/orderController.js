const Order = require("../models/order");
const User = require("../models/user");

// Add Order
exports.addOrder = async (req, res) => {
  const user = req.user
  console.log("user ORder: ",user)
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
      let { items,  userEmail, email, postalCode  } = req.body;
      console.log("Items: ",items)
      const user = await User.findOne({email:userEmail})
      items = items.map((item)=>({
        ...item, item:item.id, quantity:item.quantity, price:item.price, productTotal: item.quantity * item.price
      }))
      console.log("Items2: ",items)
      const total = items.reduce((total, item) => total + item.productTotal, 0).toFixed(2) 
  
      const newOrder = new Order({
        customer: user._id,
        items,
        email,
        total,
        postalCode, 
        orderType: 'dine-in',
        status: "pending",
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