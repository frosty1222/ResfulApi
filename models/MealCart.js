const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const MealCart= new Schema({
    name:String,
    image:String,
    price:String,
    status:Number,
    delivery_type:String,
    quantity:Number,
    total_price:Number,
    customer_name:String,
    customer_phone:Number,
    customer_email:String,
    drink:[],
    paytime:String,
})
module.exports = mongoose.model('MealCart',MealCart)