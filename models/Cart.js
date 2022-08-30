const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Cart = new Schema({
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
    drink:{
        'beverage_name':{
            'type':{type:String},
            'value':[String]
        },
        'beverage_image':{
            'type':{type:String},
            'value':[String]
        },
        'beverage_price':{
            'type':{type:Number},
            'value':[Number]
        },
    }
})
module.exports = mongoose.model('Cart',Cart)