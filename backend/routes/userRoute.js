const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {hasPermission} = require('../middleware/permissionMiddleware');
const {verifyToken} = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', hasPermission('view_users'), userController.getAllUsers);

router.get('/:role', hasPermission('view_users'), userController.getUsersByRole);

router.delete('/:id', hasPermission('delete_user'), userController.deleteUser);

router.post('/', hasPermission('add_user'), userController.addUser);


module.exports = router;