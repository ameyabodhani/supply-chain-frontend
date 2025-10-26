// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // import CSS for styling

const Home = () => {
  return (
    // Main container
    <div className="home-container">

      {/* Header section */}
      <header className="home-header">
        <h1>Supply Chain Portal</h1>
        <p>Welcome to the Supply Chain Management System</p>
      </header>

      {/* Buttons section */}
      <div className="button-section">
        {/* These links go to other routes */}
        <Link to="/signin" className="home-button">User Login</Link>
        <Link to="/vsignin" className="home-button">Vendor Login</Link>
        <Link to="/signup" className="home-button">Sign Up</Link>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 Supply Chain Portal</p>
      </footer>

    </div>
  );
};

export default Home;
