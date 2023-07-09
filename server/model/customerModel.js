const mongoose=require('mongoose')

const customerSchema=ema=new mongoose.Schema({
    name:{
        type:String,
        required:[]
    },
    email:{
        type:String,
        required:[true,'email is require']
    },
    phone:{
       type:Number,
       required:[true,'password is require']
    },
    address:{
        type:String,
         required:[true,"Address is require"]
    }

})

const customerModel=mongoose.model('customers',customerSchema)
module.exports=customerModel;

