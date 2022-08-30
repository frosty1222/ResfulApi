const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const {TokenCheckMiddleware} = require('../util/middleware');
router.get('/index',TokenCheckMiddleware,productController.index)
router.post('/addnewpro',productController.addNew)
router.post('/editproduct/:id',productController.editProduct)
router.post('/geteditvalue/:_id',productController.getEditValue)
router.post('/deleteproduct/:id',productController.deleteProduct)
router.post('/showproduct/:id',TokenCheckMiddleware,productController.showProduct)
router.post('/getchangepage/:id',productController.getChangePage);
router.post('/getsort/:id',productController.getSort);
module.exports = router;