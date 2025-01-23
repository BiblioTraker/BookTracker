import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Library } from "lucide-react";
import AuthContext from "../context/AuthContext"; // Importer le contexte AuthContext
import { useBooks } from "../context/BookContext"; // Importer le contexte des livres

function Header({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Récupérer l'utilisateur et la fonction logout
  const { resetBooks } = useBooks(); // Utiliser resetBooks pour vider les livres

  const handleLogout = () => {
    navigate("/login"); // Redirige vers la page de connexion
    logout(); // Déconnecte l'utilisateur
    localStorage.clear(); // Supprime toutes les données du localStorage
    resetBooks(); // Réinitialise les livres
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg dark:from-purple-800 dark:to-indigo-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et lien vers la page d'accueil */}
          <div className="flex items-center space-x-4">
            <Library className="w-8 h-8" />
            <Link to="/" className="text-xl font-bold hover:underline">
              BiblioTracker
            </Link>
          </div>
          {/* Navigation */}
          <nav className="p-4">
            <ul className="flex justify-between items-center">
              {/* Liens vers les sections Mes Livres et Ajouter un Livre */}
              <div className="flex space-x-4">
                <li>
                  <Link to="/books" className="hover:underline">
                    Mes Livres
                  </Link>
                </li>
                <li>
                  <Link to="/add-book" className="hover:underline">
                    Ajouter un Livre
                  </Link>
                </li>
                <li>
                  <Link to="/statistics" className="hover:underline">
                    Statistiques
                  </Link>
                </li>
              </div>
              {/* Section connexion/déconnexion */}
              <div className="ml-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">Bienvenue, {user.name} !</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Connexion
                  </Link>
                )}
              </div>
              {/* Bouton pour basculer le thème */}
              <button
                onClick={toggleTheme}
                className="p-2 ml-4 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                {isDarkMode ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;


