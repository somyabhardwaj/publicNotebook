import React, { useEffect } from 'react';
import NoteItems from './NoteItems';

import { Routes, Route, Link } from 'react-router-dom';
import fetchNotes from '../redux/api/notesApi';
import { useDispatch, useSelector } from 'react-redux';
import Usernavbar from './user/Usernavbar';

function Home() {
       const dispatch = useDispatch();
       const token = useSelector((state)=>state.user.authToken)
  useEffect(()=>{
        dispatch(fetchNotes(token))
  })
  return (
    <>
    <Usernavbar />
      <div className='text-center '>     
        <Link to="/notecards" className='btn btn-success m-2'>Cards</Link>
      </div>
      <Routes>
        <Route path="/*" element={<NoteItems />} />
        
      </Routes>
    </>
  );
}

export default Home;
