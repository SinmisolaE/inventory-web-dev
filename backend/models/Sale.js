const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: BigDecimal,
        required: true
    },
    unitSellPrice: {
        type: BigDecimal,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    createdAt: {
        type: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Sale', SaleSchema);