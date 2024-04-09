const User=require('../models/userModel')
const ErrorResponse=require('../utils/errorResponse')

exports.allUsers =async (req,res,next)=>{
    //enable pagination
    const pageSize=10       //no of users displayed per page
    const page=Number(req.query.pageNumber)||1       //Retrieves the page number from the query parameters. 
                                                    //If the page number is not provided, defaults to page 1.
    const count=await User.find({}).estimatedDocumentCount()   //Retrieves the total number of users in the database 

    try {
        const users =await User.find().sort({createdAt: -1}).select('-password')
        .skip(pageSize*(page-1))     //no of users to be skipped
        .limit(pageSize)

        res.status(200).json({
            success:true,
            users,
            page,
            pages:Math.ceil(count/pageSize),
            count


        })
        next()

        
    } catch (error) {

        return next(error)
        
    }
}

//show single user
exports.singleUser = async(req,res,next)=>{

    try {

        const user =await User.findById(req.params.id)
        res.status(200).json({
            success:true,
            user

        })
        next()
        
    } catch (error) {

        return next(error)
        
    }
}

//edit user

exports.editUser = async(req,res,next)=>{

    try {

        const user =await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            success:true,
            user

        })
        next()
        
    } catch (error) {

        return next(error)
        
    }
}
exports.deleteUser=async(req,res,next)=>{
    try {
        const user =await User.findByIdAndRemove(req.params.id)
        res.status(200).json({
            success:true,
            user
        })
        next()
        
    } catch (error) {
        return next(error)
        
        
    }
}

//jobs history
exports.createUserJobsHistory=async(req,res,next)=>{
    const {title,description,salary,location}=req.body
    try {
        const currentUser =await User.findOne({_id:req.user._id})
        if(!currentUser){
            return next(new ErrorResponse("You must log in",401))
        }
        else{
            const addJobHistory ={
                title,
                description,
                salary,
                location,
                user:req.user._id

            }
            currentUser.jobsHistory.push(addJobHistory)
            await currentUser.save()
        }

        res.status(200).json({
            success:true,
            currentUser
        })
        next()
        
    } catch (error) {
        return next(error)
        
        
    }
}

