const { send } = require('express/lib/response');
const Cater = require('../models/Cater');
const multer = require('multer');
const fs = require('fs');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
class CaterController{
    CaterIndex(req,res){
      Cater.find({}).then(cavalue=>{
        res.json({
            "data":multipleMongooseToObject(cavalue)
        });
    })
    .catch(err=>{
        res.json({"err":err})
    });
     }
     addNewCater(req,res,next){
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null,'../ResfulApi/uploads/caterImage')
            },
            filename: function (req, file, cb) {
            cb(null,file.originalname)
            }
        })
        var upload = multer({ storage: storage });
           upload.fields([{name:'sub_dish_one_image',maxCount:1},{name:'sub_dish_two_image',maxCount:1},{name:'sub_dish_three_image',maxCount:1},{name:'sub_dish_four_image',maxCount:1},{name:'sub_dish_five_image',maxCount:1},{name:'sub_dish_six_image',maxCount:1}])
           (req,res,(error)=>{
              if(error){
                return next(error);
              }else{
               //   console.log(Date.now())
                var name_of_file = req.files;
                var sub_dish_one_image = name_of_file.sub_dish_one_image.map((a)=>{
                  return a.originalname
                })
                var sub_dish_two_image = name_of_file.sub_dish_two_image.map((a)=>{
                  return a.originalname
                })
                var sub_dish_three_image = name_of_file.sub_dish_three_image.map((a)=>{
                  return a.originalname
                })
                var sub_dish_four_image = name_of_file.sub_dish_four_image.map((a)=>{
                  return a.originalname
                })
                   const formData = req.body;
                     formData.sub_dish_one_image =sub_dish_one_image.toString();
                     formData.sub_dish_two_image =sub_dish_two_image.toString();
                     formData.sub_dish_three_image =sub_dish_three_image.toString();
                     formData.sub_dish_four_image =sub_dish_four_image.toString();
                     if(name_of_file.sub_dish_five_image !=null){
                      var sub_dish_five_image = name_of_file.sub_dish_five_image.map((a)=>{
                         return a.originalname
                      })
                      formData.sub_dish_five_image=sub_dish_five_image.toString();
                   }
                  if(name_of_file.sub_dish_six_image !=null){
                     var sub_dish_six_image = name_of_file.sub_dish_six_image.map((a)=>{
                        return a.originalname.toString()
                      })
                      formData.sub_dish_six_image =sub_dish_six_image.toString();
                  }
                     const cater = new Cater(formData);
                     cater.save();
                    res.json(
                    {
                        "message":'add new cater successfully',
                     }
                    );
                
              }
           })
     }
     editCater(req,res,next){
      const option = {new:true}
      var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null,'../ResfulApi/uploads/caterImage')
        },
        filename: function (req, file, cb) {
        cb(null,file.originalname)
        }
    })
    var upload = multer({ storage: storage });
       upload.fields([{name:'sub_dish_one_image',maxCount:1},{name:'sub_dish_two_image',maxCount:1},{name:'sub_dish_three_image',maxCount:1},{name:'sub_dish_four_image',maxCount:1},{name:'sub_dish_five_image',maxCount:1},{name:'sub_dish_six_image',maxCount:1}])
       (req,res,(error)=>{
          if(error){
            return next(error);
          }else{
           //   console.log(Date.now())
            var name_of_file = req.files;
            var sub_dish_one_image = name_of_file.sub_dish_one_image.map((a)=>{
              return a.originalname
            })
            var sub_dish_two_image = name_of_file.sub_dish_two_image.map((a)=>{
              return a.originalname
            })
            var sub_dish_three_image = name_of_file.sub_dish_three_image.map((a)=>{
              return a.originalname
            })
            var sub_dish_four_image = name_of_file.sub_dish_four_image.map((a)=>{
              return a.originalname
            })
               const formData = req.body;
                 formData.sub_dish_one_image =sub_dish_one_image.toString();
                 formData.sub_dish_two_image =sub_dish_two_image.toString();
                 formData.sub_dish_three_image =sub_dish_three_image.toString();
                 formData.sub_dish_four_image =sub_dish_four_image.toString();
                 if(name_of_file.sub_dish_five_image !=null){
                  var sub_dish_five_image = name_of_file.sub_dish_five_image.map((a)=>{
                     return a.originalname
                  })
                  formData.sub_dish_five_image=sub_dish_five_image.toString();
               }
              if(name_of_file.sub_dish_six_image !=null){
                 var sub_dish_six_image = name_of_file.sub_dish_six_image.map((a)=>{
                    return a.originalname.toString()
                  })
                  formData.sub_dish_six_image =sub_dish_six_image.toString();
              }
                 Cater.findByIdAndUpdate(req.params.id,formData,option,function(err){
                  if(err){
                    res.json({"id":req.params.id})
                  }else{
                      res.json({"message":'Edit cater successfully'});
                  }
               })
          }
       })
     }
     showCater(req,res,next){
      Cater.findOne({_id:req.params.id}).then(catershow=>{
        res.json({"showValue":mongooseToObject(catershow)})
     });
     }
     deleteCater(req,res,next){
      const id  = req.params.id;
      Cater.findByIdAndDelete(id,function(err){
          if(err){
              res.status(404).send(err);
          }else{
              res.json(
                  {"message":'delete cater item successfully',
                    "id":id,
                  }
              );
          }
      }) 
     }
     getIdValue(req,res,next){
      Cater.where({_id:req.params.id}).then(cater=>{
        res.json({"data":multipleMongooseToObject(cater)})
     });
     }
}
module.exports = new CaterController();