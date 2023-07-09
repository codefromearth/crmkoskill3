const customerModel=require('../model/customerModel');
//const userModel = require('../model/userModel');

//create data
const createData=async(req,res)=>{
   const data=new customerModel(req.body);
   await data.save();
   res.send({success:true,message:"data save successfully"})
}

//read data
const  readData=async(req,res)=>{
    const data=await customerModel.find()
    res.json({success:true,data:data})
}

const updateData=async(req,res)=>{
    const {_id,...rest}=req.body

    const data= await customerModel.updateOne({_id : _id},rest)
    res.send({success:true,message:"data update successfully",data:data})

}

const deleteData=async(req,res)=>{
      const id=req.params.id
      const data=await customerModel.deleteOne({_id:id})
      res.send({success:true,message:"data delete successfully", data:data})

}
async function searchData(req, res) {
    try {
      let result = await customerModel.find({
        name: { $regex: req.params.key }
      });
  
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while searching for data.'
      });
    }
  }


  const sortData=async(req,res)=>{
    let data = await customerModel.find({}).sort({ name: 1 }).collation({ locale: "en", strength: 1 });
    res.json({success:true,data:data})

  }

module.exports={createData,readData,updateData,deleteData,searchData,sortData}