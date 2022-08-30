const { send } = require('express/lib/response');
const User = require('../models/User');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
const secret = "iloveyouforever";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const jwt_decode = require('jwt-decode');
const decodeToken = require('../util/decodeToken');
var value ="";
// "token":jwt_decode(token)
var tokenTime ="";
var accessTokens = "";
var tokens ="";
var users = "";
var messages = "";
class UserController{
    async index(req,res){
        if(req.body.refreshToken && req.headers['authorization']){
            const tokenfordecode =req.headers['authorization'].split(' ')[1];
            const decoded = await jwt.verify(tokenfordecode,secret,{ignoreExpiration: true,},(err,payload)=>{
               User.findOne({name:payload.name}).then(user =>{
                    if(user.refreshToken === req.body.refreshToken){
                        const token = jwt.sign({data},secret,{expiresIn:"10days"});
                        const accessToken = jwt.sign({accessDatatoken},secret,{expiresIn:"1days"});
                        User.updateOne({ _id: user._id },{refreshToken:token},function(err,docs){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(docs)
                            }
                        });
                        res.json({
                            "message":"login successfully",
                            "user":[accessToken,token,user]
                        })
                    }
               })
            });
        }else{
            res.json({"message":"token not found"})
        }
    }
    async checkTokenLife(req, res, next){
        const tokenfordecode =req.headers['authorization'].split(' ')[1];
          await jwt.verify(tokenfordecode,secret,{ignoreExpiration:true},(err,payload)=>{
           if(err){
              res.json({"tokendecoded":JSON.stringify(err.accessDatatoken)})
           }
                res.json({"tokendecoded":JSON.stringify(payload.accessDatatoken)})
        })
    }
   async register(req,res,next){
        const formData = req.body;
        // formData.password = encryptedPassword;
        const user = new User(formData);
        var encryptedPassword = bcrypt.hash(req.body.password, 10);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
        if(user.save()){
            res.json(
                {
                    "message":'user register successfully',
                    "password":req.body
                }
            );
        }
    }
    login(req,res){
        const userCheck = User.findOne({email:req.body.email}).then(user=>{
            if(userCheck){
                 bcrypt.compare(req.body.password,user.password,function(err,result){
                    if(err){
                        return res.status(400).send('password is not correct');
                    }else{
                        if(result === true){
                            const data = user.email;
                            const accessDatatoken = user;
                            const token = jwt.sign({data},secret,{expiresIn:"10days"});
                            const accessToken = jwt.sign({accessDatatoken},secret,{expiresIn:"1days"});
                            if(req.body.accessToken ===""){
                                accessTokens = accessToken;
                                tokens = token;
                                users = user;
                                messages ="login successfully"
                            }else{
                                accessTokens = accessToken;
                                tokens = token;
                                users = user;
                                messages ="login successfully"
                            }
                            if(user.refreshToken == ""){
                                User.updateOne({ _id: user._id },{refreshToken:token},function(err,docs){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log(docs)
                                    }
                                });
                                accessTokens = accessToken;
                                tokens = token;
                                users = user;
                                messages ="login successfully"
                            }
                            if(req.body.refreshToken && req.headers['authorization']){
                                const tokenfordecode =req.headers['authorization'].split(' ')[1];
                                jwt.verify(tokenfordecode,secret,(err,payload)=>{
                                    if(err){
                                        if(err.message == "jwt expired"){
                                            const decoded = jwt.verify(tokenfordecode,secret,{ignoreExpiration: true,},(err,payload)=>{
                                                User.findOne({name:payload.accessDatatoken.name}).then(user =>{
                                                        if(user.refreshToken === req.body.refreshToken){
                                                            const token = jwt.sign({data},secret,{expiresIn:"10days"});
                                                            const accessToken = jwt.sign({accessDatatoken},secret,{expiresIn:"1days"});
                                                            User.updateOne({ _id: user._id },{refreshToken:token},function(err,docs){
                                                                if(err){
                                                                    console.log(err);
                                                                }else{
                                                                    console.log(docs)
                                                                }
                                                            });
                                                            accessTokens = accessToken;
                                                            tokens = token;
                                                            users = user;
                                                            messages ="login successfully"
                                                        }
                                                })
                                                });
                                        }
                                    }else{
                                        accessTokens = accessToken;
                                        tokens = token;
                                        users = user;
                                        messages ="login successfully"
                                    }
                                })
                            }
                            
                        }
                    }
                 });
                 res.json({
                    "message":messages,
                    "user":[accessTokens,tokens,users],
                })
            }
        });
    }
    getReturnBackValue(req, res, next){
       value =  req.body;
    }
    logout(req,res){
    }
    checkEmail(req,res){
        User.findOne({email:req.params.id}).then(emc=>{
            res.json({"data":mongooseToObject(emc)})
        })
    }
    checkPassword(req,res){
        User.findOne({password:req.params.id}).then(emc=>{
            res.json({"data":mongooseToObject(emc)})
        })
    }
    checkPhone(req,res){
        User.findOne({phone:req.params.id}).then(emc=>{
            res.json({"data":mongooseToObject(emc)})
        })
    }
}
module.exports = new UserController();