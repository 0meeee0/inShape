require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const eventRouter = require('./routes/eventRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/event', eventRouter)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(3001, () => {
      console.log("app running");
    });
})
.catch((err)=>console.log("error:",err))