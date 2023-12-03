const mongoose = require ('mongoose')
// const dotenv = require('dotenv')
// dotenv.config();

const connectToMongo =()=>{
mongoose.connect(process.env.mongoURI).then(()=>{
    console.log("connected to Mongoose")
}).catch((error)=>{
    console.log(error)
})
}
module.exports = connectToMongo;