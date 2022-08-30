const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const {TokenCheckMiddleware} = require('../util/middleware');
router.post('/userIndex',userController.index);
router.post('/registerUser',userController.register);
router.post('/login',userController.login);
router.post('/logout',userController.logout);
router.post('/emailcheck/:id',userController.checkEmail);
router.post('/phonecheck/:id',userController.checkPhone);
router.post('/passcheck/:id',userController.checkPassword);
router.post('/getturnback',userController.getReturnBackValue);
router.post("/checktokenlife",userController.checkTokenLife);
module.exports = router;