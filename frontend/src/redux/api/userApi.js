import { createAsyncThunk} from '@reduxjs/toolkit';

import axios from "axios";

const host ="http://localhost:5000/api/";

// Route 1- Signup form
export const userSignIn = createAsyncThunk('user/create', async (user) => {
    try {
      const data = {
        name: user.name,
        email: user.email,
        password: user.password
      };
         
      const response = await fetch(`${host}user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
       
      return result;
    } catch (err) {
      throw err;
    }
});

//Route 2 - Login form

export const userLogin = createAsyncThunk('user/login', async (user)=>{
            
    try{
       
        const data = {
            email:user.email,
            password:user.password
        }
        console.log(data)
        const res = await axios.post(`${host}user/login`,data)
        return res
    }catch(err){
        throw err;
    }
})