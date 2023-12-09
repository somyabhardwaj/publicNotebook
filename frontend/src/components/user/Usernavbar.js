import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';




function Usernavbar() {
  
   const data = useSelector((state)=> state.user.data)
  const location = useLocation();
   const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    // console.log(location.pathname)
  },[location])
 
 
       
  const clickLogout= ()=>{
          
           // Clear the authToken from localStorage
    try {
        localStorage.removeItem("authToken");
      } catch (error) {
        // Handle errors here, e.g., log the error or fallback to default behavior
        console.error("Error removing authToken from localStorage:", error);
      }
      dispatch(logout())
            navigate("/")
           
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">{data && data.userData.name}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className= {`nav-link ${location.pathname === "/home" ? "active":""}`}aria-current="page" to="/">Home</Link>
        </li>        
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active":""}`} to="/about">About</Link>
        </li>
       </ul>
       <li>
        
        <button onClick={()=>{setTimeout(clickLogout,[500])}} className="btn btn-outline-light mx-4"> Logout </button> 
        
       </li>
   
    </div>
  </div>
</nav>
    </>
  )
}

export default Usernavbar
