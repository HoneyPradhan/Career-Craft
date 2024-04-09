const express = require('express')
const router = express.Router()
// const {sign_in} =require('../controllers/authController')
const {allUsers, singleUser, editUser, deleteUser, createUserJobsHistory}=require('../controllers/userController')
const {isAuthenticated,isAdmin}=require('../middleware/auth')



// /api/allUsers
router.get('/allUsers',isAuthenticated,allUsers)

// /api/user/id
router.get('/user/:id',isAuthenticated,singleUser)

// /api/user/edit/id
router.put('/user/edit/:id',isAuthenticated,editUser)
// /api/user/delete/id
router.delete('/admin/user/delete/:id',isAuthenticated,isAdmin,deleteUser)

// /api/user/jobhistory
router.post('/user/jobhistory',isAuthenticated,createUserJobsHistory)


module.exports = router;