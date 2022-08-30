const express = require('express');
const router = express.Router();
const couponController = require('../controllers/CouponController');
router.get('/indexCoupon',couponController.index)
router.post('/addcoupon',couponController.addNewCoupon)
module.exports = router;