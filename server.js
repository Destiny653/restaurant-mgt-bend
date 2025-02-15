const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
app.use(cors())
app.use(express.json());

// Import routes
const menuRoutes = require("./src/routes/menuRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const staffRoutes = require("./src/routes/staffRoutes");
const ownerRoutes = require("./src/routes/ownerRoutes");
const authRoute = require("./src/routes/authRoutes")
const customerRoute = require("./src/routes/customerRoutes")

// Use routes
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);

app.use((req, res, next)=>{
  return res.status(404).json({
      status: 'NOT FOUND',
      status_code: 404,
      message: 'The requested resource was not found',
      data:{
          protocol: req.protocol,
          method: req.method.toUpperCase(),
          url: req.originalUrl,
          path: req.path,
          query: req.query,
          ip: req.ip, 
          host: req.hostname,  
          port: req.port,
          timestamp: new Date()
      }
  })
})

app.use((error, req, res, next)=>{
  return res.status(500).json({
      status: 'ERROR',
      status_code: error.status || 500,
      message: error.message,
      data:{
          protocol: req.protocol,
          method: req.method.toUpperCase(),
          error: error.stack,
          url: req.originalUrl,
          path: req.path,
          query: req.query,  
          ip: req.ip,
          host:req.hostname, 
          port: req.port,
          timestamp: new Date()
      }
  })
});


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Database connected")
  })
  .catch((err) => console.log(err));
