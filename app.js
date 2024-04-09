const express=require("express")
const mongoose=require("mongoose")
const app=express()
const morgan =require("morgan")
const bodyParser=require("body-parser")
require("dotenv").config()
var cors=require("cors")

//IMPORT ROUTES
const authRoutes =require('./routes/authRoutes')
//database connection
const userRoutes=require('./routes/userRoutes')

const jobsTypeRoute=require('./routes/jobsTypeRoute')

const jobRoute = require('./routes/jobsRoutes')




const cookieParser = require("cookie-parser")
const errorHandler=require("./middleware/error")


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}) 
    .then(() => console.log("DB connected"))
    .catch((  err) => console.log(err));


    //MIDDLEWARE
    app.use(morgan('dev'))
    app.use(bodyParser.json({limit: "5mb"}))
    app.use(bodyParser.urlencoded({
        limit: "5mb",
        extended:true

    }))

    app.use(cookieParser())
    app.use(cors())

    app.get("/health",async(req,res)=>{
        res.send({message:"health OK!"})

    })

    
    app.use('/api',authRoutes)

    app.use('/api',userRoutes)

    app.use('/api',jobsTypeRoute)
    
    app.use('/api',jobRoute)

    

//Routes MIDDLEWARE
    // app.get('/',(req,res)=>{
    //     res.send("Hello from node js")
      
    // })
    //error middleware
    app.use(errorHandler)


const port = process.env.PORT ||9000;

app.listen(port,()=>{
    console.log(`Server running on the port ${port}`);
})
