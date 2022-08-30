const { send } = require('express/lib/response');
const Beverage = require('../models/Beverage');
const multer = require('multer');
const fs = require('fs');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
class BeverageController{
    BeIndex(req,res){
        Beverage.find({}).then(bevalue=>{
            res.json({
                "data":multipleMongooseToObject(bevalue)
            });
        })
        .catch(err=>{
            res.json({"err":err})
        });
     }
     addNewBe(req,res,next){
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null,'../ResfulApi/uploads/beverage')
            },
            filename: function (req, file, cb) {
            cb(null,file.originalname)
            }
        })
        var upload = multer({ storage: storage })
           upload.single("beverage_image")(req,res,(error)=>{
              if(error){
                return next(error);
              }else{
               //   console.log(Date.now())
                 const formData = req.body;
                 formData.beverage_image =req.file.originalname;
                 const be = new Beverage(formData);
                 be.save();
                  res.json({"message":'add a new refresher successfully'});
              }
           })
     }
     editBe(req,res,next){
        const option = {new:true}
       var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null,'../ResfulApi/uploads/')
        },
        filename: function (req, file, cb) {
        cb(null,file.originalname)
        }
    })
    var upload = multer({ storage: storage })
       upload.single("image")(req,res,(error)=>{
          if(error){
            return next(error);
          }else{
           //   console.log(Date.now())
             const formData = req.body;
             formData.image =req.file.originalname;
             Beverage.findByIdAndUpdate(req.params.id,formData,option,function(err){
                if(err){
                  res.json({"id":req.params.id})
                }else{
                    res.json({"message":'edit beverage successfully'});
                }
             })
          }
       })
     }
     deleteBe(req,res){
        const id  = req.params.id;
        Beverage.findByIdAndDelete(id,function(err){
            if(err){
                res.status(404).send(err);
            }else{
                res.json(
                    {"message":'this refresher deleted successfully',
                    }
                );
            }
        })
     }
     getValue(req,res){
        Beverage.findOne({_id:req.params.id}).then(be=>{
            res.json({"value":mongooseToObject(be)})
         });
     }
}
module.exports = new BeverageController();