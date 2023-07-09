const express=require('express');
const { loginController } = require('../controllers/userControllers');
const { registerController } = require('../controllers/userControllers');
const AuthMiddileware = require('../middileware/AuthMiddileware');
const { authController } = require('../controllers/userControllers');


//router object

const router=express.Router()

//routes

//login||post
router.post('/login',loginController)

//register|| post

router.post('/register',registerController);

//Auth|| Post
router.post('/getUserData',AuthMiddileware,authController)

module.exports=router;