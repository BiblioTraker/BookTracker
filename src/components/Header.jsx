import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Library } from 'lucide-react';
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";



function Header({ toggleTheme, isDarkMode }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // État de chargement
  const [profile, setProfile] = React.useState({ displayName: "", avatar: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileRef = doc(db, "users", user.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          }
        } catch (error) {
          console.error("Erreur lors du chargement du profil :", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Une erreur s'est produite lors de la déconnexion.");
    } finally {
      setLoading(false);
    }
  };

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
            <Link to="/add-book" className="hover:underline">Ajouter un Livre</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline mr-4">Profil</Link>
          </li>
        </div>
        <div className="flex items-center space-x-4">
        {user && profile.avatar && (
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          )}
          {user && profile.displayName && (
            <span className="hidden sm:inline">{profile.displayName}</span>
          )}
          {user ? (
            <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            disabled={loading}
          >
            {loading ? "Déconnexion..." : "Déconnexion"}
          </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-sm bg-gray-700 text-white p-2 mt-4 mb-4 rounded hover:bg-gray-600"
              >
                Connexion
              </Link>
              <Link
                to="/sign-up"
                className="text-sm bg-gray-700 text-white p-2 mt-4 mb-4 rounded hover:bg-gray-600"
              >
                Créer un compte
              </Link>
            </div>
          )}
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