import React from 'react'
import Navbar from '../components/Navbar';
function Landing() {
  return (
    <div>
    <Navbar />
     
    <div>
      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Notebook App</h1>
          <p className="lead">Effortlessly organize your thoughts and ideas</p>
          <button className="btn btn-light btn-lg">Get Started</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mt-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">User Authentication</h5>
                <p className="card-text">Secure your notes with user authentication using JWT.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Intuitive Interface</h5>
                <p className="card-text">A user-friendly interface for a seamless note-taking experience.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Cloud Storage</h5>
                <p className="card-text">Store and access your notes from anywhere with cloud storage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to get started?</h2>
          <p className="lead">Sign up now and enhance your note-taking experience with Notebook App.</p>
          <button className="btn btn-primary btn-lg">Sign Up</button>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Landing
