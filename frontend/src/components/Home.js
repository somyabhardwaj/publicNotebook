import React from 'react';
import NoteItems from './NoteItems';
import NoteItemsCard from './NoteItemsCard';
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className='text-center '>
        {/* <Link to="/note" className='btn btn-success m-2'>Table</Link> */}
        <Link to="/notecards" className='btn btn-success m-2'>Cards</Link>
      </div>
      <Routes>
        <Route path="/*" element={<NoteItems />} />
        {/* <Route path="/note" element={<NoteItemsCard />} /> */}
      </Routes>
    </>
  );
}

export default Home;
