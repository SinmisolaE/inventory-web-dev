const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {hasRole} = require('../middleware/roleMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', hasRole(['admin']), userController.getAllUsers);

router.get('/:role', hasRole(['admin']), userController.getUsersByRole);

router.delete('/:id', hasRole(['admin']), userController.deleteUser);

router.post('/', hasRole(['admin']), userController.addUser);

router.patch('/reset-password', hasRole(['admin']), userController.resetUserPassword);

module.exports = router;