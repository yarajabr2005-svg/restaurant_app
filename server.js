const express= require('express')
const colors= require('colors')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDB = require('./config/db')

//dot env configuration
dotenv.config() //if it was in a different folder, we would have to provide the path with curly brackets inside config()

//DB Connect
connectDB();

//rest object
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//route
//URL=> http://localhost:8080
app.use('/api/v1/test', require('./routes/testRoutes'));//Tells Express: "For any request that starts with /api/v1/test,
                                                        // use the routes defined in testRoutes.js."
app.use('/api/v1/auth', require('./routes/authRoutes'));   
app.use('/api/v1/user', require('./routes/userRoutes'))                                                   

app.get('/', (req, res)=>{
    return res.status(200).send('<h1 style="color: pink; font-size: 32px;">Welcome to Food Server App API Base Project</h1>')
});

//PORT
const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT, () =>{
    console.log(`Server Running on port: ${PORT}`.magenta);
})