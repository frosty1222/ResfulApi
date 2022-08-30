const express = require('express');
const router = express.Router();
const test_controller = require('../controllers/TestController');
router.get('/index',test_controller.index)
module.exports = router;