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

  // Fonction pour uploader l'avatar
  const uploadAvatar = async (avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, // Utiliser le token de l'utilisateur
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Avatar mis à jour :", data.avatar);

        // Mettre à jour l'état utilisateur
        setUser((prevUser) => ({ ...prevUser, avatar: data.avatar }));
        localStorage.setItem("user", JSON.stringify({ ...user, avatar: data.avatar }));
      } else {
        console.error("Erreur lors de l'upload de l'avatar");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, uploadAvatar, canAccessPasswordPages, allowPasswordPageAccess, disallowPasswordPageAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;