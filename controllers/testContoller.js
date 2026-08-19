const testUserController=(req, res)=>{
    try{
        res.status(200).send({
            success: true,
            message: "Test User Data API",
        }); // or do thr <h1> <\h1> one
    }
    catch(error){
        console.log("Error in Test API", error)

    }
};

module.exports={testUserController};
