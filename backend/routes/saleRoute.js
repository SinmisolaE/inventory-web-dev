const express = require('express');
const router = express.Router();

const saleController = require('../controllers/saleController');
const {hasRole} = require('../middleware/roleMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', hasRole(['admin', 'seller']), saleController.getAllSales);

router.get('/:id', hasRole(['admin', 'seller']), saleController.getSaleById);

router.post('/', hasRole(['seller']), saleController.Sell);

module.exports = router;