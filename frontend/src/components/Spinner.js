import React from 'react'
import Navbar from './Navbar'

function Spinner() {
  return (
    <>
    
    <div className='overflow-hidden' style={{marginTop:"30vh"}}>
    <div className=' d-flex justify-content-center align-itens center'  style={{height:"50.5vh"}}>
  <div className="spinner-border" role="status">
    <span className=" visually-hidden">Loading...</span>
  </div>
</div>
      
    </div>
    </>
  )
}

export default Spinner
