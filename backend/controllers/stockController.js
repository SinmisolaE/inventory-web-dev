const Stock = require('../models/Stock');

// Get all stock items
const getAllStock = async (req, res) => {
	try {
		const stock = await Stock.find()
			.populate('stocker', 'username role');
		res.status(200).json({
			success: true,
			data: stock
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

// Get stock by ID
const getStockById = async (req, res) => {
	try {
		const stock = await Stock.findById(req.params.id)
			.populate('stocker', 'username role');
		
		if (!stock) {
			return res.status(404).json({
				success: false,
				message: 'Stock item not found'
			});
		}
		
		res.status(200).json({
			success: true,
			data: stock
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

// Add new stock
const addStock = async (req, res) => {
	try {
		const { code, name, model, initialAmount, unitCostPrice, unitSellPrice, source } = req.body;
		const stocker = req.user.id; // from JWT middleware

		// Validate required fields
		if (!code || !name || !model || !initialAmount || !unitCostPrice || !unitSellPrice || !source) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required'
			});
		}

		// Check if stock code already exists
		const existing = await Stock.findOne({ code });
		if (existing) {
			return res.status(409).json({
				success: false,
				message: 'Stock code already exists'
			});
		}

		// Create new stock with currentAmount = initialAmount
		const stock = new Stock({
			code,
			name,
			model,
			initialAmount,
			currentAmount: initialAmount,
			unitCostPrice,
			unitSellPrice,
			source,
			stocker
		});

		await stock.save();

		const populatedStock = await Stock.findById(stock._id)
			.populate('stocker', 'username role');

		res.status(201).json({
			success: true,
			message: 'Stock added successfully',
			data: populatedStock
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

// Update stock
const UpdateStock = async (req, res) => {
	try {
		const { name, model, currentAmount, unitCostPrice, unitSellPrice, source } = req.body;

		const stock = await Stock.findById(req.params.id);
		
		if (!stock) {
			return res.status(404).json({
				success: false,
				message: 'Stock item not found'
			});
		}

		// Update only provided fields
		if (name !== undefined) stock.name = name;
		if (model !== undefined) stock.model = model;
		if (currentAmount !== undefined) stock.currentAmount = currentAmount;
		if (unitCostPrice !== undefined) stock.unitCostPrice = unitCostPrice;
		if (unitSellPrice !== undefined) stock.unitSellPrice = unitSellPrice;
		if (source !== undefined) stock.source = source;

		await stock.save();

		const updatedStock = await Stock.findById(stock._id)
			.populate('stocker', 'username role');

		res.status(200).json({
			success: true,
			message: 'Stock updated successfully',
			data: updatedStock
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

// Delete stock
const deleteStock = async (req, res) => {
	try {
		const stock = await Stock.findById(req.params.id);
		
		if (!stock) {
			return res.status(404).json({
				success: false,
				message: 'Stock item not found'
			});
		}

        if (stock.currentAmount > 0) {
            return res.status(400).json({
				success: false,
				message: `Cannot delete stock with remaining items (${stock.currentAmount} units). Sell or adjust to zero first.`
			});
        }
		
		res.status(200).json({
			success: true,
			message: 'Stock deleted successfully',
			id: req.params.id
		});

        await Stock.findByIdAndDelete(req.params.id);
        
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

module.exports = {
	getAllStock,
	getStockById,
	addStock,
	UpdateStock,
	deleteStock
};
