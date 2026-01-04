const express = require('express');
const router = express.Router();

const saleController = require('../controllers/saleController');
const {hasRole} = require('../middleware/roleMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', hasRole(['admin', 'seller']), stockController.getAllSales);

router.get('/:id', hasRole(['admin', 'seller']), stockController.getSaleById);

router.post('/', hasRole(['seller']), stockController.Sell);

module.exports = router;