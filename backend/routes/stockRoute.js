const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stockController');
const {hasPermission} = require('../middleware/permissionMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', hasPermission('view_stock'), stockController.getAllStock);

router.get('/:id', hasPermission('view_stock'), stockController.getStockById);

router.delete('/:id', hasPermission('delete_stock'), stockController.deleteStock);

router.post('/:id', hasPermission('update_stock'), stockController.UpdateStock);

router.post('/', hasPermission('add_stock'), userController.addStock);


module.exports = router;