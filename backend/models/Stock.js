const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    model: {
        type: String,
        required: true
    },
    initialAmount: {
        type: int,
        required: true
    },
    currentAmount: {
        type: int,
        required: true
    },
    unitCostPrice: {
        type: BigDecimal,
        required: true
    },
    unitSellPrice: {
        type: BigDecimal,
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