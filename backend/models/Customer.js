const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);