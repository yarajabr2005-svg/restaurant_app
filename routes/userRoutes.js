const express=require('express')
const { getUserController } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router=express.Router()

//routes
//GET USER DATA || GET
router.get('/getUser', authMiddleware, getUserController)
module.exports=router