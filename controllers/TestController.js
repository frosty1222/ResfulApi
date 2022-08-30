const { send } = require('express/lib/response');
const Test = require('../models/Test');
class TestController{
    index(req,res){
      res.json({"message":'index view of test controller'});
    }
}
module.exports = new TestController();