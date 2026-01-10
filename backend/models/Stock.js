const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    initialAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    unitCostPrice: {
        type: Number,
        required: true
    },
    unitSellPrice: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    stocker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Stock', StockSchema);