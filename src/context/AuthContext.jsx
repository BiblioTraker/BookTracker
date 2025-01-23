import { createContext, useState, useEffect } from "react";
import { useBooks } from "./BookContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { fetchBooks } = useBooks(); // Importer fetchBooks depuis BookContext
  const [canAccessPasswordPages, setCanAccessPasswordPages] = useState(false); // Nouvel état

  // Charger les données utilisateur depuis le localStorage au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchBooks(); // Charger les livres pour l'utilisateur stocké
    }
  }, []);

  // Connexion d'un utilisateur
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    fetchBooks(); // Charger les livres après la connexion
  };

  // Déconnexion d'un utilisateur
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const allowPasswordPageAccess = () => {
    setCanAccessPasswordPages(true);
  };

  const disallowPasswordPageAccess = () => {
    setCanAccessPasswordPages(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, canAccessPasswordPages, allowPasswordPageAccess, disallowPasswordPageAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;