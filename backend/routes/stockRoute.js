const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stockController');
const {hasRole} = require('../middleware/roleMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

// backend/routes/stockRoute.js
// Read-only access also allowed for sellers
router.get('/', hasRole(['admin', 'stocker', 'seller']), stockController.getAllStock);

router.get('/:id', hasRole(['admin', 'stocker', 'seller']), stockController.getStockById);

router.post('/', hasRole(['admin', 'stocker']), stockController.addStock);

router.patch('/:id', hasRole(['admin', 'stocker']), stockController.UpdateStock);

router.delete('/:id', hasRole(['admin']), stockController.deleteStock);

module.exports = router;