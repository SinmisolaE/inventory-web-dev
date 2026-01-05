const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/', authController.login);
router.patch('/password', authController.updatePassword);

module.exports = router;