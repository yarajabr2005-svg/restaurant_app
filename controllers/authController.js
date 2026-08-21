const userModel = require("../models/userModel")
const bcrypt= require("bcryptjs")
const JWT=require('jsonwebtoken')

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

        //hashing the password before saving the user
        const salt = await bcrypt.genSalt(10); // the higher the salt rounds, the more tightly the password will be encrypted
        const hashedPassword = await bcrypt.hash(password, salt);

        //if the validation is completed, create user
        const user=await userModel.create({userName, email, password:hashedPassword, address, phone})
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


//Login
const loginController=async(req,res)=>{
    try{
        const{email, password}=req.body

        //validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: 'Please Provide Email and Password.'
            })
        }

        //check user email
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'User Not Found.'
            })
        }

        //Check password || Compare password
        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }//As soon as the password matxhes, we create the token

        //create token        //this id is an object inside sign
        const token=JWT.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn:"7d"
        });//sign function to encrypt (here based on id)
                              
        user.password=undefined // to hide password even more from being displayed
        res.status(200).send({
            success:true,
            message: 'Login Successful.',
            token,
            user // later on we will tokenize
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login API.',
            error
        })
    }

}

module.exports={registerController, loginController}