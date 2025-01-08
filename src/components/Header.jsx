import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Library } from 'lucide-react';

function Header({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg dark:from-purple-800 dark:to-indigo-800">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Library className="w-8 h-8" />
          <Link to="/" className="text-xl font-bold hover:underline">BiblioTracker</Link>
        </div>
    <nav className="p-4">
      <ul className="flex justify-between items-center">
        <div className="flex space-x-4">
          <li>
            <Link to="/books" className="hover:underline">Mes Livres</Link>
          </li>
          <li>
            <Link to="/add-book" className="hover:underline">Ajouter un Livre</Link>
          </li>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 ml-4 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {isDarkMode ? (<Moon className="w-5 h-5" />): (<Sun className="w-5 h-5" />)}
        </button>
      </ul>
    </nav>
    </div>
      </div>
    </header>
  );
}


export default Header;