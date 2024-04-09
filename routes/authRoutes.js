const express = require('express')
// const {sign_in} =require('../controllers/authController')
const {signup,sign_in,logout,userProfile}=require('../controllers/authController')
const {isAuthenticated}=require('../middleware/auth')
const router = express.Router()


//auth routes

// /api/signup
router.post('/signup',signup)
//router.get('/',sign_in)


// /api/sign_in
router.post('/sign_in',sign_in)

// /api/logout
router.get('/logout',logout)

// /api/me
router.get('/me',isAuthenticated,userProfile)


module.exports= router