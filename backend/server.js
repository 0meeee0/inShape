require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')

const app = express()

app.use(express.json())
app.use('/api/user', userRouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(3001, () => {
      console.log("app running");
    });
})
.catch((err)=>console.log("error:",err))