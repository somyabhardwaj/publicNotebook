const express = require("express");
const Notes = require('../modules/NotesSchema');
const router = express.Router();
const fetchUser = require('../middleware/getuser')
const { body, validationResult } = require('express-validator');


// Route 1 : to fetch all notes of the user using get method /api/notes/getnotes  
router.get('/getnotes',fetchUser, async (req,res)=>{
   
    try{
        const notes = await Notes.find({user:req.user})
        res.status(200).json(notes)
    }catch(err){
        console.log(err)
    }

})


// Route 2: to create a new note using post requiest /api/notes/addnote 
router.post('/addnote',fetchUser,[
    body('title', "Title should be atleant 5 char").isLength({min:5}),
    body('description', "  description should be atleant 5 char").isLength({min:5})

], async (req, res)=>{

    const err = validationResult(req)

    if (!err.isEmpty()){
  return res.status(400).json({err})
    }
    try{
        const note = {
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            user:req.user            
        }
        const savenote = await Notes.create(note);
        res.status(200).json(savenote)
console.log(note)
    }catch (error) {
        console.log({ error })
        return res.status(500).json({ err: error.message })
    }

})

// Route 3 : updating a note using put request /api/notes/updatenote

router.put('/updatenote/:id',fetchUser, async(req,res)=>{

    try{
        const {title,description,tag } = req.body
        const newNote = {}
        if (title){newNote.title = title}
        if (description){newNote.description = description}
        if (tag){newNote.tag = tag}

        const note = await Notes.findById(req.params.id)
            if (!note){
                return res.status(401).send("Note Not found")
            }
        //   console.log(note.user.toString())
        //   console.log(typeof note.user)
            if (note.user.toString() !== req.user){
                return res.status(401).send("Invalid Request")
            }
            const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
               console.log(updatedNote)
            return res.status(200).json(updatedNote)
        
    }catch (error) {
        console.log({ error })
        return res.status(500).json({ err: error.message })
    }
})

// Route 4 : find element and delete it /api/notes/deletenote
router.delete('/delete/:id',fetchUser, async(req,res)=>{
    try{
                
        const note = await Notes.findById(req.params.id)
        if (!note){
            return res.status(401).send("Note Not found")
        }
        if(note.user.toString() !== req.user){
            return res.status(404).send("Invalid Request")
        }

        const deletenote = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).send("Note Deleted Successfully")
    }catch (error) {
        console.log({ error })
        return res.status(500).json({ err: error.message })
    }
})



module.exports = router;
