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
import NoteItems from './components/NoteItems';
import React, { useEffect } from 'react';
import fetchNotes from './redux/api/notesApi';
import { useDispatch } from 'react-redux';
import Edit from './components/crud/Edit';
function App() {

  const dispatch =useDispatch()
   useEffect(()=>{
dispatch(fetchNotes())
   },[dispatch])
  return (
   <>

   <BrowserRouter>
   <Navbar />
   <NoteItems />
   <div className='container'>
   <Routes>
    <Route path="/" element={  <Home />}/>
   <Route path="/about" element={  <About />}/>
   <Route path="/about" element={  <About />}/>
   <Route path="/edit" element={  <Edit />}/>
  
  
    </Routes>
    </div>
    </BrowserRouter>
   
   </>
  );
}

export default App;
