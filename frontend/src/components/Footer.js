import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">Contact: Somyabhardwaj004@gmail.com</p>
          </div>
          <div className="col-md-6">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} className="text-light" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/your-instagram-profile" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className="text-light" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={30} className="text-light" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} className="text-light" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-0">Credits to Somya Bhardwaj</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
