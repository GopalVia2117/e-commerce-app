const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [String],
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('WishList', WishListSchema);