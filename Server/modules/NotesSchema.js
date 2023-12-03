const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
   user:{
      type : mongoose.Schema.Types.ObjectId,
      ref:'User'

   },
             title:{
                type:String,
                require:true
             },
             description:{
                type:String,
                require:true
             },
             tag:{
                type:String,
                
             },
             date:{
                type:Date,
                default:Date.now
             }
})
const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;