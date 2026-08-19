const express=require('express') //Imports Express to use its routing features
const { testUserController } = require('../controllers/testContoller') //auto imported using the vs code extension for auto imports

//router object
const router=express.Router()

//routes GET | POST | UPDATE | DELETE
router.get('/test-user',testUserController )
//router.post('/test-user', testUserController) 
//router.put('/test-user/:id', testUserController)  

//export so we could use it in any file
module.exports=router