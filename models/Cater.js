const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Cater = new Schema({
    cater_type:String,
    sub_dish_one:String,
    sub_dish_one_image:String,
    sub_dish_two:String,
    sub_dish_two_image:String,
    sub_dish_three:String,
    sub_dish_three_image:String,
    sub_dish_four:String,
    sub_dish_four_image:String,
    sub_dish_five:String,
    sub_dish_five_image:String,
    sub_dish_six:String,
    sub_dish_six_image:String,
    cater_price:Number,
})
module.exports = mongoose.model('Cater',Cater)