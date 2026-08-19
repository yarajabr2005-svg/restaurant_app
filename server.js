const express= require('express')
const colors= require('colors')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')

//dot env configuration
dotenv.config() //if it was in a different folder, we would have to provide the path with curly brackets inside config()
//rest object
const app=express()

//middlewares
app.use(cors)
app.use(express.json())
app.use(morgan('dev'))

//route
//URL=> http://localhost:8080
app.get('/', (req, res)=>{
    return res.status(200).send('<h1 style="color: pink; font-size: 32px;">Welcome to Food Server App API Base Project</h1>')
});

//PORT
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT, () =>{
    console.log(`Server Running on port: ${PORT}`.magenta);
})