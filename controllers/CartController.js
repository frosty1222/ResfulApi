const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const {mongooseToObject} = require('../util/mongoose');
const {multipleMongooseToObject} = require('../util/mongoose');
const today = require('../util/getTime');
var couponData = "";
var couponDate="";
class CartController{
   addCart(req, res, next){
        Product.findOne({_id:req.params.id}).then(pro=>{
            const formData = req.body;
                 Cart.findOne({name:pro.name}).then(ul=>{
                     if(ul !==""){
                     let newQuantity =formData.quantity + ul.quantity;
                    Cart.updateOne({name:ul.name},{quantity:newQuantity},function(err,docs){
                        if(err){
                            console.log(err);
                        }else{
                            console.log(docs)
                        }
                    });
                  }else{
                    formData.name = pro.name;
                    formData.image = pro.image;
                    formData.price = pro.price;
                    const cart = new Cart(formData);
                    cart.save();
                  }
            })
            Cart.where({customer_name:req.body.customer_name}).then(pro=>{
                res.json(
                    {
                        "message":"add cart successfully",
                        "data":multipleMongooseToObject(pro)
                    })
            })
        })
    }
    getCartItem(req,res){
        if(req.body.role ==="user"){
            Cart.where({customer_name:req.body.user_name}).then(pro=>{
                res.json({"data":multipleMongooseToObject(pro)})
             })
        }else{
            Cart.find({}).then(pro=>{
                res.json({"data":multipleMongooseToObject(pro)})
             })
        }
        
    }
    removeCartItem(req, res, next){
        const id = req.params.id;
        Cart.findByIdAndDelete(id,function(err){
            if(err){
                res.status(404).send(err);
            }else{
                res.json(
                    {
                        "message":'delete cart item successfully',
                    }
                );
            }
        }) 
    }
    checkCoupon(req,res){
        const coupon_code = req.params.id;
       Coupon.findOne({coupon_code:coupon_code}).then(coupon=>{
          if(today === coupon.coupon_expired_date){
               couponDate = "Your Coupon is Expired !";
          }else{
               couponData = coupon;
          }
           res.json(
                {
                    "data":couponData,
                    "message":couponDate
                }
            )
       })
    }
    
}
module.exports = new CartController();