const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phone: {
        type: String,
        requird: true
    },
    email: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true
    },
    items: [{
        item: {
            type: String,
            ref: 'MenuItem', 
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        itemsTotal: {
            type: Number,
            default: function () {
                return this.quantity * this.price;
            }
        },
        specialInstructions: String
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
    },
    orderType: {
        type: String,
        enum: ['dine-in', 'takeaway', 'delivery'],  
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);