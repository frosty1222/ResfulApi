const Cart = require('../models/Cart');
const MealCart = require('../models/MealCart');
const Cater = require('../models/Cater');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const {mongooseToObject} = require('../util/mongoose');
const {multipleMongooseToObject} = require('../util/mongoose');
const today = require('../util/getTime');
var couponData = "";
var couponDate="";
var cartMealMessage = "";
var testR = "";
class CartController{
   addCart(req, res, next){
        Product.findOne({_id:req.params.id}).then(pro=>{
            const formData = req.body;
                Cart.findOne({name:pro.name}).then(ul=>{
                if(ul !==null){
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
    addMealCart(req,res,next){
        const formData = req.body;
        const mealcart = new MealCart(formData);
        MealCart.findOne({name:req.body.name}).then(ca=>{
            if(ca !==null){
                let newQuantity = ca.quantity + req.body.quantity
                MealCart.updateOne({name:ca.name},{quantity:newQuantity},function(err,docs){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(docs)
                    }
                });
                if(ca.drink !==""){
                   ca.drink.map((a)=>{
                    formData.drink.map((l)=>{
                        if(a.beverage_name ===l.beverage_name){
                            let newQuantity = a.beverage_quantity + l.beverage_quantity;
                            MealCart.updateOne({name:ca.name,"drink.beverage_name":a.beverage_name},{$set:{"drink.$.beverage_quantity":newQuantity}},function(err,docs){
                              if(err){
                                  console.log(err);
                              }else{
                                  console.log(docs)
                              }
                          });
                        }
                    })
                   })
                   cartMealMessage = "update MealCart successfully!";
                   testR="hello";
                }
                if(ca.drink == ""){
                    // testR = "hellow";
                    formData.drink.map((s)=>{
                        testR =s.beverage_name;
                        MealCart.findOneAndUpdate({'name':req.body.name},{$push:{drink:s}},function(err,docs){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(docs)
                            }
                           
                        });
                    })
                    cartMealMessage = "add mealCart successfully";
                }
                // if(ca.drink ===""){
                    
                // }
            }else{
                mealcart.save();
                cartMealMessage = "add mealCart successfully";
            }
            res.json(
                {
                    "message":cartMealMessage,
                    "test":testR
            })
        })
    }
    getCartItem(req,res){
        if(req.body.role ==="user"){
            Cart.where({customer_name:req.body.user_name,status:1}).then(pro=>{
                res.json({"data":multipleMongooseToObject(pro)})
             })
        }else{
            Cart.find({}).then(pro=>{
                res.json({"data":multipleMongooseToObject(pro)})
             })
        }
        
    }
    getMealCart(req,res,next){
        if(req.body.role ==="user"){
            MealCart.where({customer_name:req.body.user_name,status:1}).then(pro=>{
                res.json({"data":multipleMongooseToObject(pro)})
             })
        }else{
            MealCart.find({}).then(pro=>{
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
    removeMealCart(req, res, next){
        const id = req.params.id;
        MealCart.findByIdAndDelete(id,function(err){
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
    removeBeverageItem(req,res, next){
        const formData = req.body;
        const elementMatched ={
            beverage_name:formData.beverage_name,
            beverage_image:formData.beverage_image,
            beverage_price:formData.beverage_price,
            beverage_quantity:formData.beverage_quantity,
        }
        MealCart.findOneAndUpdate({'name':formData.cater_name},{$pull:{drink:elementMatched}},function(err,docs){
            if(err){
                console.log(err);
            }else{
                console.log(docs)
            }
           res.json({"message":'delete successfully!'});
        });
    }
    
}
module.exports = new CartController();