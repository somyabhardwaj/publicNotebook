import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const host = "http://localhost:5000/api/";

// Fetch all notes
const fetchNotes = createAsyncThunk("notes/getnotes", async ()=>{

   try{
      const notes = await axios.get(`${host}notes/getnotes`,{
         headers:{
            "auth-token":"eyJhbGciOiJIUzI1NiJ9.NjU2MzMxZjc5MTZmOWFjNTQ1NDgyOTNk.xgQuQ4N-f2b_QLh-jDhbPxVYyw0tEBdX92qz8fqbFUU"
         }
      })

      return notes.data

   }catch(err){
      throw err
   }

})

// Create note
export const createNotes = createAsyncThunk("/notes/addnote", async (data)=>{

   const note ={
    title:data.title,
    description:data.description,
    tag:data.tag
   }
 try{
    const response = await axios.post(`${host}notes/addnote`,note,{
       headers:{
          "auth-token":"eyJhbGciOiJIUzI1NiJ9.NjU2MzMxZjc5MTZmOWFjNTQ1NDgyOTNk.xgQuQ4N-f2b_QLh-jDhbPxVYyw0tEBdX92qz8fqbFUU"
       }
    })
   console.log("this is response",{response})
 }catch(err){
    throw err
 }
 
 })

// Edit notes
export const editNotes = createAsyncThunk("/updatenote/:id", async (data)=>{

  const note ={
   title:data.title,
   description:data.description,
   tag:data.tag
  }
try{
   const response = await axios.put(`${host}notes/updatenote/${data.id}`,note,{
      headers:{
         "auth-token":"eyJhbGciOiJIUzI1NiJ9.NjU2MzMxZjc5MTZmOWFjNTQ1NDgyOTNk.xgQuQ4N-f2b_QLh-jDhbPxVYyw0tEBdX92qz8fqbFUU"
      }
   })
 return response
}catch(err){
   throw err
}

})


//Delete notes

export const deleteNote = createAsyncThunk("/delete/:id",async (id)=>{

   try{
      const response = await axios.delete(`${host}delete/${id}`,{
         headers:{
            "auth-token":"eyJhbGciOiJIUzI1NiJ9.NjU2MzMxZjc5MTZmOWFjNTQ1NDgyOTNk.xgQuQ4N-f2b_QLh-jDhbPxVYyw0tEBdX92qz8fqbFUU"
      
         }
         
      })
            
 return response
   }catch(err){
      throw err
   }


})

export default fetchNotes;
