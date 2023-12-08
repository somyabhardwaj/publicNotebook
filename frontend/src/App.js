import {
  BrowserRouter,
  Routes,
  Route,
}
  from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import About from './components/About';
import React from 'react';
import NoteItems from './components/NoteItems';
import NoteItemsCard from './components/NoteItemsCard';
import Signin from './components/user/Signin';
import Login from './components/user/Login';
import Landing from './components/Landing';
import Alert from './components/Alert';



function App() {


  return (
    <>

      <BrowserRouter>
        
        <Signin />
        <Login />

        
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/notecards" element={<NoteItemsCard />} />
            <Route path="/note" element={<NoteItems />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signin" element={<Alert/>} />


          </Routes>
       
      </BrowserRouter>

    </>
  );
}

export default App;
