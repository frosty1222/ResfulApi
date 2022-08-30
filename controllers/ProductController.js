const { send } = require('express/lib/response');
const Product = require('../models/Product');
const multer = require('multer');
const fs = require('fs');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
var pageChange ="";
var sortNum = 0;
class ProductController{
    index(req,res){
        const page = parseInt(pageChange) || 1;
        const perPage = 5;
        const start =(page -1) * perPage;
        const end = page * perPage;
        if(sortNum !=0){
            Product.find({},null,{limit:sortNum}).then(productvalue=>{
                res.json({
                    "data":multipleMongooseToObject(productvalue),sortNum,page
                });
            })
            .catch(err=>{
                res.json({"err":err})
            });
        }
         Product.find({}).then(productvalue=>{
            res.json({
                "data":multipleMongooseToObject(productvalue).slice(start,end),page
            });
        })
        .catch(err=>{
            res.json({"err":err})
        });
    }
    getChangePage(req,res,next){
        var result  = req.params.id;
        pageChange = result;
        res.json({"value":result})
    }
    getSort(req,res,next){
        var sortValue = req.params.id;
        sortNum = sortValue;
        res.json({"val": sortNum})
    }
    addNew(req,res,next){
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
                     formData.image =req.file.originalname ;
                     const product = new Product(formData);
                     product.save();
                      res.json({"message":'add new product successfully'});
                  }
               })
    }
    editProduct(req,res,next){
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
             Product.findByIdAndUpdate(req.params.id,formData,option,function(err){
                if(err){
                  res.json({"id":req.params.id})
                }else{
                    res.json({"message":'edit product successfully'});
                }
             })
          }
       })
    }
    getEditValue(req,res){
        Product.where({id:req.params.id}).then(product=>{
            res.json({"data":multipleMongooseToObject(product)})
         });
    }
    deleteProduct(req,res,next){
        const id  = req.params.id;
        Product.findByIdAndDelete(id,function(err){
            if(err){
                res.status(404).send(err);
            }else{
                res.json(
                    {"message":'delete product successfully',
                      "id":id,
                    }
                );
            }
        })
    }
    showProduct(req,res,next){
        Product.findOne({_id:req.params.id}).then(product=>{
            res.json({"showValue":mongooseToObject(product)})
         });
    }
}
module.exports = new ProductController();