const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Test = new Schema({
    name:String,
    age:Number,
})
module.exports = mongoose.model('Test',Test)