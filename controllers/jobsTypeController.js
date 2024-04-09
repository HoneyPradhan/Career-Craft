const jobType = require('../models/jobTypeModel')
const ErrorResponse=require('../utils/errorResponse')

exports.createJobType = async(req,res,next)=>{

    try {
        const jobT= await jobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id



        })
        res.status(201).json({
            success:true,
            jobT
        
        })



        
    } catch (error) {

        next(error)


        
    }

}

//all jobs category
exports.allJobsType=async(req,res,next)=>{
    try {
        const jobT = await jobType.find()
            res.status(200).json({
                success:true,
                jobT
    
            
        })
    } catch (error) {
        next(error)
        
    }
}

//all jobs category
exports.updateJobsType=async(req,res,next)=>{
    try {
        const jobT = await jobType.findByIdAndUpdate(req.params.type_id,{new:true})
            res.status(200).json({
                success:true,
                jobT
    
            
        })
    } catch (error) {
        next(error)
        
    }
}


exports.deleteJobsType=async(req,res,next)=>{
    try {
        const jobT = await jobType.findByIdAndRemove(req.params.type_id,{new:true})
            res.status(200).json({
                success:true,
                message:"Job type deleted"
    
            
        })
    } catch (error) {
        next(new ErrorResponse("server error",500))
        
    }
}