const express = require('express');
const router = express.Router();
const beController = require('../controllers/BeverageController');
router.get('/beindex',beController.BeIndex);
router.post('/addnewbe',beController.addNewBe);
router.post('/editbe/:id',beController.editBe);
router.post('/deletebe/:id',beController.deleteBe);
router.post('/getvalue/:id',beController.getValue);
module.exports = router;