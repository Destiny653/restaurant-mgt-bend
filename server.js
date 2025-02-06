const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

// Import routes
const menuRoutes = require("./src/routes/menuRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const staffRoutes = require("./src/routes/staffRoutes");
const ownerRoutes = require("./src/routes/ownerRoutes");
const authRoute = require("./src/routes/authRoutes")

// Use routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/auth", authRoute);

mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   console.log("Database connected")
  })
.catch((err) => console.log(err));
