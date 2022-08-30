const Coupon = require('../models/Coupon');
class CouponController{
    index(req,res){
      
    }
    addNewCoupon(req,res){
        const FormData = req.body;
        const coupon = new Coupon(FormData);
        coupon.save();
        res.json({"message":"Coupon created"});
    }
}
module.exports = new CouponController();