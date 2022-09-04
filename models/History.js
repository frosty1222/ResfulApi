const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const History= new Schema({
    name:String,
    image:String,
    price:String,
    quantity:String,
    customer_name:String,
    customer_phone:String,
    customer_email:String,
})
module.exports = mongoose.model('History',History)