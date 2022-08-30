const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Coupon = new Schema({
    coupon_name:String,
    coupon_code:String,
    coupon_expired_date: String,
    coupon_percentage:Number,
})
module.exports = mongoose.model('Coupon',Coupon)