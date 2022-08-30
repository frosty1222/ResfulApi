const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Product = new Schema({
    name:String,
    description:String,
    image:String,
    price:Number,
    sale_price:String,
    quantity:Number,
})
module.exports = mongoose.model('Product',Product)