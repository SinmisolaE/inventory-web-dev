const express = require('express');
const router = express.Router();

const saleController = require('../controllers/saleController');
const {hasPermission} = require('../middleware/permissionMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', hasPermission('view_sale'), stockController.getAllSales);

router.get('/:id', hasPermission('view_sale'), stockController.getSaleById);

router.post('/', hasPermission('sell'), stockController.Sell);

module.exports = router;