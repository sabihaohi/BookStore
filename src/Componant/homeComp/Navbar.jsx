import { useState } from "react";
import { FaHome, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Track search input

  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass search term to parent
  };

  return (
    <nav className="bg-slate-200 bg-opacity-70 backdrop-blur-md p-6 w-full shadow-xl fixed top-0 left-0 z-10">
      <div className="flex items-center justify-between w-full">
        {/* Logo or Brand Name */}
        <div
          className="text-2xl font-bold hover:cursor-pointer transition-all hover:-translate-y-1 duration-150 animate-bounce"
          onClick={() => navigate("/")}
        >
          ZeptoBook
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776;
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex justify-center w-full">
          <input
            type="text"
            value={searchTerm} // Controlled input
            onChange={handleSearchChange} // Handle real-time search
            placeholder="Search by title, author, genre..."
            className="w-1/2 p-2 px-5 rounded-3xl text-gray-700 border-2 border-gray-500 bg-neutral-200 hover:scale-105 transform transition-transform duration-300"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-10 mr-20">
          <a
            href="/"
            className="hover:text-gray-500 flex items-center space-x-1 transform transition-transform duration-300 hover:-translate-y-1"
          >
            <FaHome />
            <span>Home</span>
          </a>
          <a
            href="/wishlist"
            className="hover:text-gray-500 flex items-center space-x-1 transform transition-transform duration-300 hover:-translate-y-1"
          >
            <FaHeart />
            <span>Wishlist</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <a
            href="/"
            className="hover:text-gray-500 flex items-center space-x-1 transform transition-transform duration-300 hover:-translate-y-1"
          >
            <FaHome />
            <span>Home</span>
          </a>
          <a
            href="/wishlist"
            className="hover:text-gray-500 flex items-center space-x-1 transform transition-transform duration-300 hover:-translate-y-1"
          >
            <FaHeart />
            <span>Wishlist</span>
          </a>
        </div>
      )}
    </nav>
  );
};

// Prop Types validation
Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;
