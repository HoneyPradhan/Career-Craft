// const mongoose = require('mongoose')
// const { ObjectId }=mongoose.Schema
// const bcrypt=require('bcryptjs')
// const jwt=require("jsonwebtoken")


// //defining a mongoose schema as follows:
// // const jobsHistorySchema= new mongoose.Schema({

// //     title:{
// //         type:String,
// //         trim:true,
// //         maxLength:70
// //     },
// //     description:{
// //         type:String,
// //         trim:true,
        

// //     },
// //     salary:{
// //         type:String,
// //         trim:true,
    
// //     },
// //     interviewDate:{
// //         type:Date
// //     },
// //     applicationStatus:{
// //         type:String,
// //         enum:['pending','accepted','rejected'],
// //         default:'pending'
// //     },
// //     location:{
// //         type:String,
// //     },
// //     user:{
// //         type:ObjectId,
// //         ref:"User",
// //         required:true
        
// //     }





// // }, {timestamps: true})
    

// // module.exports=mongoose.model("Job",jobSchema)    //I created a mongoose model named(user) out of a schema userSchema and then export it.









// //defining a mongoose schema as follows:
// const userSchema= new mongoose.Schema({

//     firstName:{
//         type:String,
//         trim:true,
//         required:[true,'First name is required'],
//         maxLength:31


//     },
//     lastName:{
//         type:String,
//         trim:true,
//         required:[true,'last name is required'],
//         maxLength:31


//     },
//     email:{
//         type:String,
//         trim:true,
//         required:[true,'email is required'],
//         maxLength:31,
//         unique:true,
//         match:[
//             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             'Please add a valid email'
//         ]  
//         // The match validator in Mongoose is like a rule that checks if a field 
//         // (in this case, the email field) follows a certain pattern.
//         //  The pattern is defined using a special code called a regular expression. 
//         // The purpose of this particular regular expression is 
//         // to ensure that the email address provided looks like a standard email address.                                     


//     },

//     password:{
//         type:String,
//         trim:true,
//         required:[true,'password is required'],      //if password is not provided,I display a custom error message
//         minLength:[6,'password must have at least 6 characters']

//     },

//    // jobsHistory:[jobsHistorySchema],
//     role:{
//         type:Number,
//         default:0
//     }

// },{timestamps:true})  //why did we use timestamps?    Timestamps: I've included the timestamps option, which automatically adds *createdAt and updatedAt fields* to my documents. This is useful for tracking when a user is created or last updated.

// //encrypt the password


// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next()
//     }   //before saving the document,if password is not changed,don't hash it just move to the next middleware function
//     this.password=await bcrypt.hash(this.password,10)
//     //the cost factor(10) determines how computationally expensive the hashing process will be.
// })
     
// //compare user password
// userSchema.methods.comparePassword=async function(enteredPassword)
// {
//     return await bcrypt.compare(enteredPassword,this.password)

// }
// //return a jwt token
// userSchema.methods.getJwtToken=function(){
//     return jwt.sign({id:this.id}, process.env.JWT_SECRET,{   //creates a jwt token and returns it //payload //secret :for jwt's integrity
//         expiresIn:3600                                   
//     })
// }

// module.exports=mongoose.model("User",userSchema)    //I created a mongoose model named(user) out of a schema userSchema and then export it.

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");//importing 



const jobsHistorySchema = new mongoose.Schema({      //creating a mongoose schema

    title: {
        type: String,
        trim: true,            //trim to remove leading and trailing whitespace
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],     //an option that restricts the values that applicationStatus can have. It's an array of strings, indicating the allowed values. In this case, applicationStatus can only be one of three values: 'pending', 'accepted', or 'rejected'. Any other value will result in a validation error.
        default: 'pending'
    },

    user: {
        type: ObjectId,
        ref: "User",           //This line establishes a reference to another Mongoose model, in this case, the "User" model. It tells Mongoose that the user field will contain ObjectId values that correspond to documents in the "User" collection.
        required: true
    },



}, { timestamps: true })     //Helps include the createdAt and updatedAt 

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxLength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxLength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [                                                                     //If a value is provided for the email field that doesn't match 
                                                                                    // the specified regular expression pattern, Mongoose will throw 
                                                                                    // a validation error with the message 'Please add a valid email'
             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minLength: [6, 'password must have at least (6) characters'],
    },

    jobsHistory: [jobsHistorySchema],                           // it means that the field will contain an array of documents that adhere to the schema specified by jobsHistorySchema.

    role: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

//encrypting password before saving
userSchema.pre('save', async function (next) {         //It is a pre-save hook.before a document is saved to the database, the function specified after 'save' will be executed.

    if (!this.isModified('password')) {                //The function takes next as a parameter, which is a callback function that allows the middleware to continue to the next middleware function in the stack.
        next();  
    }
    this.password = await bcrypt.hash(this.password, 10)   //The hashed password replaces the plain-text password in the password field of the document.

})

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)           //This function will be used to compare the entered password with the hashed password stored in the user document.
}

// return a JWT token
//When a user successfully logs in or registers, the application needs to provide them with a token that can be used to authenticate subsequent requests.
//This secret is known only to the server, ensuring that the token is securely generated and cannot be tampered with by clients. 
//When the server receives a token from a client, it can verify the token's authenticity by checking its signature against the secret key.


userSchema.methods.getJwtToken = function () {           //jsonwebtoken is a library
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {    //It uses the jwt.sign method .The first argument is the payload of the JWT. In this case, it's an object containing the user's ID. This payload typically contains information about the user that you want to encode into the token.
        expiresIn: 3600                                           //{payload,secret key}.. Secret key:This key is crucial for verifying the authenticity of the token later on.
    });
}                                                          //After signing the token, the jwt.sign() function returns a string representing the JWT.

//The JWT can have an expiration time (expiresIn: 3600), ensuring that the token is valid only for a limited duration (in this case, 1 hour). This adds an additional layer of security by limiting the time window during which the token can be used.


module.exports = mongoose.model("User", userSchema);