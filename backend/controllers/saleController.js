const Sale = require('../models/Sale');
const Stock = require('../models/Stock');
const Customer = require('../models/Customer');

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate('product', 'name model')
            .populate('user', 'username')
            .populate('customer', 'name contact')
            .sort({ createdAt: -1 });
        
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate('product', 'name model unitSellPrice')
            .populate('user', 'username')
            .populate('customer', 'name contact');
        
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Sell = async (req, res) => {
    try {
        console.log(req.body);
        const { product, quantity, customerName, customerContact } = req.body;
        console.log(customerName);
        // Find the product in stock
        const stockItem = await Stock.findById(product);
        if (!stockItem) {
            return res.status(404).json({ message: 'Product not found in stock' });
        }
        
        // Check if sufficient quantity available
        if (stockItem.currentAmount < quantity) {
            return res.status(400).json({ 
                message: 'Insufficient stock',
                available: stockItem.currentAmount 
            });
        }

        // Find or create customer
        let customer = await Customer.findOne({ contact: customerContact });
        if (!customer) {
            // Create new customer
            customer = new Customer({ name: customerName, contact: customerContact });
            await customer.save();
        }

        const totalSaleAmount = stockItem.unitSellPrice * quantity;
        
        // Create the sale record
        const sale = new Sale({
            product,
            user: req.user.id,
            quantity,
            unitSellPrice: stockItem.unitSellPrice,
            totalSaleAmount,
            customer: customer._id,
            createdAt: new Date()
        });
                
        // Update stock quantity
        stockItem.currentAmount -= quantity;

        await sale.save();
        await stockItem.save();
        
        // Populate and return the sale
        const populatedSale = await Sale.findById(sale._id)
            .populate('product', 'name model')
            .populate('user', 'username')
            .populate('customer', 'name contact');
        
        res.status(201).json({
            success: true,
            populatedSale
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSales,
    getSaleById,
    Sell
};