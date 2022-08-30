const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
router.post('/addcart/:id',cartController.addCart);
router.post('/removecartitem/:id',cartController.removeCartItem);
router.post('/getcartitem',cartController.getCartItem);
router.post('/checkcoupon/:id',cartController.checkCoupon);
module.exports = router;