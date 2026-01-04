const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stockController');
const {hasRole} = require('../middleware/roleMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

// backend/routes/stockRoute.js
router.get('/', hasRole(['admin', 'stocker']), stockController.getAllStock);

router.get('/:id', hasRole(['admin', 'stocker']), stockController.getStockById);

router.post('/', hasRole(['admin', 'stocker']), stockController.addStock);

router.post('/:id', hasRole(['admin', 'stocker']), stockController.UpdateStock);

router.delete('/:id', hasRole(['admin']), stockController.deleteStock);

module.exports = router;