const express=require('express')
const { getUserController, 
    updateUserController, 
    updatePasswordController, 
    deleteUserController } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router=express.Router()

//routes
//GET USER DATA || GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE USER PROFILE(data) || PUT (but google said patch is better here)
router.put('/updateUser', authMiddleware, updateUserController)

//UPDATE PASSWORD (already logged in) || POST
router.post('/updatePassword', authMiddleware, updatePasswordController)

//DELETE USER ACCOUNT ||DELETE
router.delete('/deleteUser', authMiddleware, deleteUserController)

module.exports=router