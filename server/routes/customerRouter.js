const express=require('express');
const { readData, updateData, createData, deleteData, searchData, sortData } = require('../controllers/customerControllers');


const router=express.Router();

router.get('/' ,readData)


router.post('/post',createData);



router.put('/put', updateData);

router.delete('/delete/:id', deleteData);
router.get('/search/:key',searchData)
router.get('/sortdata',sortData)

module.exports=router;


