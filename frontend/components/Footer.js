import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Sleep Tracker. All rights reserved.
          </div>
          <p className="flex justify-center items-center">Made by Abrahm Wube (Yotor Ethiopian)</p>
          <div className="flex space-x-4">
            <a
              href="/"
              className="hover:text-blue-200"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="hover:text-blue-200"
            >
              Terms of Service
            </a>
            <a
              href="/"
              className="hover:text-blue-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



