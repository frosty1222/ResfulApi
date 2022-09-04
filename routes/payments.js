const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PayMentController');
router.post('/changeCartStatus',paymentController.ChangeCartStatus)
router.post('/movetohistory',paymentController.moveToHistory);
module.exports = router;