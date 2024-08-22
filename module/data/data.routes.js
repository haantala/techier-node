const { insertDataController, getDataController, updateDataController, deleteDataController } = require('./data.controllers');

const router = require('express').Router();

router.post('/insertData', insertDataController);
router.get('/getdata', getDataController);
router.post('/updateData',updateDataController)
router.post('/deletedata',deleteDataController)

module.exports = router;