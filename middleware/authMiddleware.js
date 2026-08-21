const JWT=require('jsonwebtoken')// we want to decrypt the token that we encrypted during login

module.exports=async(req, res, next)=>{
    try{
        //get token
        const token=req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET,(err, decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message: "Unauthorized User."
                })
            }
            else{
                req.body = req.body || {};
                req.body.id=decode.id;
                next(); // otherwise it will loop contiuously // look at this ('/getUser', authMiddleware, getUserController)
            }
        })

    }
    catch(error){
        console.log("error");
        res.status(500).send({
            success:false,
            message: 'Please Provide Auth Token.',
            error
        })
    }
}