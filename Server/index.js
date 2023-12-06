const express = require('express')
const dotenv = require('dotenv')
const connectToMongo = require('./db')
const userRouter = require('./routes/auth')
const notes = require('./routes/notes')
const cors = require('cors')

const app = express();
 
app.use(cors())
dotenv.config();
connectToMongo();
app.use(express.json());

// Require paths
app.use('/api/user', userRouter);
app.use('/api/notes', notes)

app.get("/", (req,res)=>{
    console.log("app is initialised")
    res.send("hello there")
})

app.listen(process.env.port, ()=>{
    console.log("app is listing to port 5000")
})