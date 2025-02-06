const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerOwner = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new owner
        user = new User({
            firstName,
            lastName,
            email, 
            password: hashedPassword,
            role: 'Owner' // Ensure role is set to owner
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Owner registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error: '+error.message });
    }
};

exports.getOwner = async(req, res)=>{
    try {
        const owner = await User.findOne({ role: 'Owner' }) //.select('-password');
        res.json({ success: true, data: owner });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error: '+error.message });
    }
}
// owner login

exports.loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ success: true, token });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error: '+error.message });
    }
}
