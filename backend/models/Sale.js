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
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    unitSellPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    totalSaleAmount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sale', SaleSchema);