const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/', authController.login);
router.patch('/update-password', verifyToken, authController.updatePassword);

module.exports = router;