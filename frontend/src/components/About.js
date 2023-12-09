// Import necessary dependencies
import React, { useEffect } from 'react';

import Navbar from "../components/Navbar"
const About = () => {

  
  

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card bg-light">
            <div className="card-body">
              <h1 className="card-title text-primary">Welcome to the Notebook App!</h1>
              <p className="card-text">
                Experience the power of the MERN (MongoDB, Express, React, Node.js) stack with our innovative Notebook application.
              </p>
              <h3 className="card-subtitle mb-4 mt-4 text-muted">Key Features</h3>
              <ul className="list-group">
                <li className="list-group-item">User authentication using JWT (JSON Web Tokens)</li>
                <li className="list-group-item">Secure password storage using bcrypt</li>
                <li className="list-group-item">Data storage in MongoDB using Mongoose</li>
                <li className="list-group-item">Redux for efficient state management</li>
                <li className="list-group-item">Axios for seamless API requests</li>
                <li className="list-group-item">Notistack for user-friendly notifications</li>
              </ul>
              <p className="card-text mt-4">
                Explore the app and unlock the ability to effortlessly create and manage your notes.
              </p>
              <p className="card-text">
                The Notebook App is designed to provide you with a seamless and intuitive experience for your note-taking needs.
              </p>
              <p className="card-text">
                Get started today and elevate your note-taking experience!
              </p>
              {/* <p className="card-text">
                <small className="text-muted">Last updated at </small>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
</>  );
};

export default About;
