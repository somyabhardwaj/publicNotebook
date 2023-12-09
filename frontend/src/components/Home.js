import React, { useEffect } from 'react';
import NoteItems from './NoteItems';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import fetchNotes from '../redux/api/notesApi';
import { useDispatch, useSelector } from 'react-redux';
import Usernavbar from './user/Usernavbar';
import { userDetails } from '../redux/api/userApi';

function Home() {
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const token = useSelector((state)=>state.user.authToken)
  useEffect(()=>{
    
        dispatch(fetchNotes(token))
        dispatch(userDetails(token)).then((response)=>{
          console.log({response:response.payload})
     })
        if(token === null){
          navigate("/")
        }
       
  })
  return (
    <>
    <Usernavbar />
      <div className='text-center '>     
        <Link to="/notecards" className='btn btn-primary m-2'>Cards</Link>
      </div>
      <Routes>
        <Route path="/*" element={<NoteItems />} />
        
      </Routes>
    </>
  );
}

export default Home;
