const User = require('../models/userModel')
const ErrorResponse = require('../utils/errorResponse')

//sign_in
exports.sign_in = async(req,res,next)=>{
 
try {

    const {email,password}=req.body
    //validation
    if(!email){
        return next(new ErrorResponse("Please add an email",403))
    }

    if(!password)
    {
        return next(new ErrorResponse("Please add a password",403))
    }

    const user=await User.findOne({email})
    if(!user)
    {
        return next(new ErrorResponse("Invalid Credentials",400))
    }

    //check password
    const isMatched=await user.comparePassword(password)
    if(!isMatched)
    {
        return next(new ErrorResponse("Invalid Credentials",400))

    }

    sendTokenResponse(user, 200, res)



}
    //check user email
catch (error) {
    next(error)
    
}
}

//signup
exports.signup = async(req,res,next)=>{
    const {email}=req.body
    const userExist =await User.findOne({email})
    if(userExist)
    {
        return next(new ErrorResponse("Email already registered",400))
    }
try {
    const user=await User.create(req.body)
    res.status(201).json({
        success:true,
        user
    })
} catch (error) {
    next(error)
    
}
}

const sendTokenResponse=async(user,codeStatus,res)=>{

    const token=await user.getJwtToken()
    res
    .status(codeStatus)
    .cookie('token',token,{maxAge:60*60*1000, httpOnly:true})  // 1 hr  // sets a cookie named 'token' in the response. The cookie contains the JWT (token) and has a maximum age of 1 hour (60 * 60 * 1000 milliseconds). The httpOnly: true flag indicates that the cookie should only be accessible by the server and not by client-side scripts, enhancing security.
    .json({
        success:true,
        role:user.role
        
    })

}

//logout
exports.logout=(req,res,next)=>{
    res.clearCookie('token')     //clears the cookie named 'token' on the client side.
    res.status(200).json({
        success:true,
        message:"logged out"

    })
}
//user profile
exports.userProfile = async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('-password')  //will display all user info except the password
    res.status(200).json({
        success: true,
        user
        
    }) 
}



// exports.sign_in=(req,res)=>{
//     res.send("hello from node js")

// } 

