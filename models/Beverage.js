const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Beverage = new Schema({
    beverage_name:String,
    beverage_image:String,
    beverage_price:Number,
    beverage_sale_price:Number,
    beverage_quantity:Number,
})
module.exports =  mongoose.model('Beverage',Beverage)