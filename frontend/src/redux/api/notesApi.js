import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const host = "https://notebook-backend-rc1m.onrender.com/";
// const host = "http://localhost:5000/api/";

// Fetch all notes
const fetchNotes = createAsyncThunk("notes/getnotes", async (token) => {
  
   try {

     const notes = await axios.get(`${host}notes/getnotes`, {
       headers: {
         "auth-token": token
       },
     });
 
     return notes.data;
   } catch (err) {
     throw err;
   }
 });
 
 // Create note
 export const createNotes = createAsyncThunk("/notes/addnote", async (data) => {

   const note = {
     title: data.title,
     description: data.description,
     tag: data.tag,
   };
   const token = data.token
   try {
     const response = await axios.post(`${host}notes/addnote`, note, {
       headers: {
         "auth-token": token,
       },
     });
     console.log("this is response", { response });
   } catch (err) {
     throw err;
   }
 });
 
 // Edit notes
 export const editNotes = createAsyncThunk("/updatenote/:id", async (data) => {

   const note = {
     title: data.title,
     description: data.description,
     tag: data.tag,
   };
   const token = data.token
   try {
     const response = await axios.put(`${host}notes/updatenote/${data.id}`, note, {
       headers: {
         "auth-token": token,
       },
     });
     return response;
   } catch (err) {
     throw err;
   }
 });
 
 // Delete notes
 export const deleteNote = createAsyncThunk("/delete/:id", async (data) => {
         
  const {noteId, token} = data

   try {
     const response = await axios.delete(`${host}notes/delete/${noteId}`, {
       headers: {
         "auth-token": token,
       },
     });
    //  console.log ({response})
     return response;
   } catch (err) {
     throw err;
   }
 });
 
 export default fetchNotes;
 