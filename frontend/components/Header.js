import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-semibold">
            Sleep Tracker
          </div>
          <nav className="space-x-4">
            <a
              href="/"
              className="text-white hover:text-blue-200 font-medium"
            >
              Home
            </a>
            <a
              href="/"
              className="text-white hover:text-blue-200 font-medium"
            >
              About
            </a>
            <a
              href="/"
              className="text-white hover:text-blue-200 font-medium"
            >
              Contact
            </a>
           
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
