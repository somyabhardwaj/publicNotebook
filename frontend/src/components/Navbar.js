import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.authToken);
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);

  const clickSignInModel = () => {
    const button = document.getElementById('myButton');
    if (button) {
      button.click();
    }
  };

  const clickLoginModel = () => {
    const button = document.getElementById('loginButton');
    if (button) {
      button.click();
    }
  };

  const onHomeClick = () => {
    if (token !== null) {
      navigate('/home');
    }
    if (token === null) {
      navigate('/alert');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={onHomeClick}>
            Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
          <Link className= {`nav-link ${location.pathname === "/home" ? "active":""}`}aria-current="page" to="/">Home</Link>
        </li>        
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link>
                <button onClick={clickLoginModel} className="btn btn-outline-light mx-2">
                  Log In
                </button>
              </Link>
              <Link>
                <button onClick={clickSignInModel} className="btn btn-outline-light mx-2">
                  Sign Up
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
