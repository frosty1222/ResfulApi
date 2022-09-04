const Cart = require('../models/Cart');
const MealCart = require('../models/MealCart');
const History = require('../models/History');
const today = require('../util/getTime');
let message ="";
let historyMessage ="";
class PayMentController{
    ChangeCartStatus(req,res,next){
       Cart.findOne({name:req.body.name}).then(ca=>{
           if(ca !==null){
            Cart.updateOne({name:ca.name},{status:req.body.status,paytime:today},function(err,docs){
                if(err){
                    console.log(err);
                }else{
                    console.log(docs)
                }
                message ="the dish is been served";
            });
           }
       })
       MealCart.findOne({name:req.body.name}).then(m=>{
          if(m!==null){
            MealCart.updateOne({name:m.name},{status:req.body.status,paytime:today},function(err,docs){
                if(err){
                    console.log(err);
                }else{
                    console.log(docs)
                }
                message ="the meal is been served";
            });
          }
       })
       res.json({"message":message});
    }
    moveToHistory(req,res,next){
        const id = req.body.id;
        const formData = req.body;
        const data = {
            name: formData.name,
            image:formData.image,
            price: formData.price,
            quantity: formData.quantity,
            customer_name: formData.customer_name,
            customer_phone: formData.customer_phone,
            customer_email: formData.customer_email,
        }
        Cart.findOne({name:req.body.name}).then(ca=>{
            if(ca !==null){
             Cart.findByIdAndDelete(id,function(err){
                if(err){
                    res.status(404).send(err);
                }else{
                    const history = new History(data)
                    history.save();
                    historyMessage = "Move to history table successfully.";
                }
            })
            }
        })
        MealCart.findOne({name:req.body.name}).then(m=>{
           if(m!==null){
             MealCart.findByIdAndDelete(id,function(err){
                if(err){
                    res.status(404).send(err);
                }else{
                    const history = new History(data)
                    history.save();
                    historyMessage = "Move to history table successfully.";
                }
            })
           }
        })
        res.json({"message":historyMessage});
    }
}
module.exports = new PayMentController();