const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }, 
    position: {
        type: String,
        enum: ['waiter', 'chef', 'manager', 'host', 'bartender'],
        required: true
    }, 
    schedule: [{
        day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        shifts: [{
            start: String,
            end: String
        }]
    }], 
    joinDate: {
        type: Date,
        default: Date.now
    },  
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);