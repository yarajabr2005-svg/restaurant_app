const userModel = require("../models/userModel");

//Get user info
const getUserController=async(req, res)=>{ //Get user's own profile (data)
    try{
        const user=await userModel.findById({_id:req.body.id}, {_id:0}) //_id:0 is like a toggle to hide it (we usually show it though)
                                            // we can access the id of the user because we have added it to the req.body in the authMiddleware.js file
        //validation
        if(!user){
            return res.ststaus(404).send({
                success:false,
                message: "User not found."
            })
        }
        
        user.password=undefined; //or we could use this: 
                                 //const user = await userModel.findById(req.body.id).select("-password")

        res.status(200).send({
            success:true,
            message:"Get User Data Successful",
            user
        })
    }  
    catch(error){
        res.status(500).send({
            success:false,
            message: "Error in Get User API.",
            error
        })
    }

}


//update user profile (data)
const updateUserController=async(req,res)=>{
    try{
        //find user
        const user= await userModel.findById({_id: req.body.id}).select("-password") 
        //validation
        if(!user){
            return res.ststaus(404).send({
                success:false,
                message: "User not found."
            })
        }

        //update
        const {userName, address, phone}=req.body
        if(userName) user.userName=userName;
        if(address) user.address=address;
        if(phone) user.phone=phone
        //save user updates
        await user.save()
        res.status(200).send({
            success:true, 
            message: "User Updated Successfully",
            user
        })

    }
    catch(error){
        return res.status(500).send({
            success:false,
            message: "Error in Update User Profile API.", 
            error
        })
    }

}

module.exports={getUserController, updateUserController}