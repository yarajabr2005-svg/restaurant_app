const express= require('express')

//rest object
const app=express()

//route
//URL=> http://localhost:8080
app.get('/', (req, res)=>{
    return res.status(200).send('<h1 style="color: pink; font-size: 32px;">Welcome to Food Server App</h1>')
});

//PORT
const PORT=8080

//listen
app.listen(PORT, () =>{
    console.log(`Server Running on port ${PORT}`);
})