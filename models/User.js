const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const User = new Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    remember_token:String,
    refreshToken:String,
    role:String,
})
module.exports = mongoose.model('User',User)