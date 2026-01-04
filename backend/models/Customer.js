const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    contact: {
        type: int,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);