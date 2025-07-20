import React from 'react';
import Navbar from './Navbar';
const Header = () => {
    return (
       <header className="bg-gradient shadow-sm py-3 px-4 d-flex justify-content-between align-items-center rounded-bottom border-bottom border-secondary">
        <div className="d-flex align-items-center">
          <h1 className="text-light fw-bold m-0 display-6">
            AI Content Generator
          </h1>
          </div>
          <Navbar />        
      </header>
    );
};

export default Header;