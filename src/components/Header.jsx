import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Library, PlusCircle, LayoutDashboard } from 'lucide-react';

function Header({ toggleTheme, isDarkMode }) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg dark:from-purple-800 dark:to-indigo-800">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Library className="w-8 h-8" />
          <h1 className="text-xl font-bold">BiblioTracker</h1>
        </div>
    <nav className="p-4">
      <ul className="flex justify-between items-center">
        <div className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Accueil</Link>
          </li>
          <li>
            <Link to="/books" className="hover:underline">Mes Livres</Link>
          </li>
          <li>
            <Link to="/add-book" className="hover:underline mr-4 ">Ajouter un Livre</Link>
          </li>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
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