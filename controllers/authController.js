const userModel = require("../models/userModel")

//Register
const registerController=async(req,res)=>{
    try{
        const{userName, email, password, address, phone}=req.body

        //validation for the required fields
        if(!userName || !email || !password ||!address || !phone){
            return res.status(500).send({ //stops (return)
                success: false,
                message: 'Please Provide All Fields.'
            })
        }

        //check for already existing user (not registered before with the same email)
        const existing=await userModel.findOne({email:email}) //since the key valuee is the same we could just write {email}
        if (existing){
            return res.status(500).send({ //stops (return)
                success: false,
                message: 'Email already Registered, Please Log in.'
            })
        }

        //if the validation is completed, create user
        const user=await userModel.create({userName, email, password, address, phone})
        res.status(201).send({
            success:true,
            message: 'User Successfully Registered',
            user
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }

}

module.exports={registerController}