const express=require('express')
const colors=require('colors')
const morgan=require('morgan')
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const cors=require('cors')

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app=express();

//middileware

app.use(express.json())
app.use(morgan('dev'))
app.use(cors());

//routes


app.use('/api/v1/user', require("./routes/userRoutes"));

app.use('/api/v1/customer',require('./routes/customerRouter'))

//PORT

const port= process.env.PORT||8080

//LISTEN PORT
app.listen(port,()=>{
    console.log(`listing to the port ${port}`.bgCyan.white)
})