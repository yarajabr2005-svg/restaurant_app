const express=require('express')
const { getUserController, updateUserController } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router=express.Router()

//routes
//GET USER DATA || GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE USER PROFILE(data) || PUT
router.put('/updateUser', authMiddleware, updateUserController)

module.exports=router