const mongoose = require('mongoose')
const { ObjectId }=mongoose.Schema
//defining a mongoose schema as follows:
const jobTypeSchema= new mongoose.Schema({

    jobTypeName  :{
        type:String,
        trim:true,
        required:[true,'Job Category is required'],
        maxLength:70
    }, 
    user:{
        type:ObjectId,
        ref:"User",
        required:true
        
    }





}, {timestamps: true})
    

module.exports=mongoose.model("JobType",jobTypeSchema)    //I created a mongoose model named(user) out of a schema userSchema and then export it.