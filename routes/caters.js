const express = require('express');
const router = express.Router();
const caterController = require('../controllers/CaterController');
router.get('/caterindex',caterController.CaterIndex);
router.post('/addNewCater',caterController.addNewCater);
router.post('/editCaterBackend/:id',caterController.editCater);
router.post('/getidvalue/:id',caterController.getIdValue);
router.post('/showcater/:id',caterController.showCater);
router.post('/deletecater/:id',caterController.deleteCater);
module.exports = router;