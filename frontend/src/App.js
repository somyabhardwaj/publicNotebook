import {  
  BrowserRouter,  
  Routes,  
  Route,  
}   
from 'react-router-dom';  

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import React, { useEffect } from 'react';
import fetchNotes from './redux/api/notesApi';
import { useDispatch } from 'react-redux';
import NoteItems from './components/NoteItems';
import NoteItemsCard from './components/NoteItemsCard';



function App() {
  
  const dispatch =useDispatch()
   useEffect(()=>{
dispatch(fetchNotes())
   },[dispatch])
  return (
   <>

   <BrowserRouter>
   <Navbar />

   <div className='container'>
   <Routes>
    <Route path="/" element={  <Home />}/>
   <Route path="/about" element={  <About />}/>
   <Route path="/about" element={  <About />}/>
  <Route path="/notecards" element={<NoteItemsCard />} />
  <Route path="/note" element={<NoteItems />} />
  
  
    </Routes>
    </div>
    </BrowserRouter>
   
   </>
  );
}

export default App;
