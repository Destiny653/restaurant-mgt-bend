const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
  try { 
    // req.user = decoded;  { id: '123456789', role: 'owner' } 
    
    const tokenValue = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    console.log("Decoded: ", decoded)
    req.user = await User.findById(decoded.id).select("-password") - //Exclude password  
      next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Error: " + error.message+ " " + 'session expired please login.' });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  console.log("Roles: ", roles)  
  const user =  req.user
  console.log("user: ",user)
 try{
  if (!roles.includes(req.body.role)) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }  
  next();
 }catch(err){
  console.log("Error: ", err)
  res.status(500).json({ success: false, message: "Server error: "+err });
 }
};
