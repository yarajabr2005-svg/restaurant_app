const mongoose=require('mongoose')

//schema
const userSchema=new mongoose.Schema({ // what about id??
    userName:{
        type:String,
        required:[true, 'Username is required.']//this field is required and added a validation message too
    }, 

    email:{
        type: String,
        required:[true, 'Email is required,'],
        unique:true
    }, 
    
    password:{
        type:String, 
        required:[true, 'Password is required.']
        //we can also add min length and max length
    },

    address:{
        type:Array
    },

    phone:{
        type:String, 
        required: [true, 'Phone number is required.']
    }, 

    userType:{
        type:String,
        required:[true, 'User type is required.'], 
        default: 'Client', 
        enum:['Client', 'Admin', 'Vendor', "Driver"]
    }, 

    profile:{
        type:String, 
        default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
    }

}, {timestamps: true})
 //no need for createdAt and updatedAt fields, this express automatically creates it with this

//const User=mongoose.model('User', userSchema) then export User , OR
//export
module.exports=mongoose.model('User', userSchema)

//but to store the data we still need to create the controllers and routes