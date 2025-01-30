import { createContext, useState, useEffect, ReactNode } from "react";
import { useBooks } from "./BookContext";

// Définition du type utilisateur
interface User {
  name: string;
  email: string;
  token: string;
  avatar?: string;
}

// Définition du type du contexte Auth
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  uploadAvatar: (avatarFile: File) => Promise<void>;
  canAccessPasswordPages: boolean;
  allowPasswordPageAccess: () => void;
  disallowPasswordPageAccess: () => void;
}

// Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Définition des props du AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { fetchBooks } = useBooks();
  const [canAccessPasswordPages, setCanAccessPasswordPages] = useState<boolean>(false);

  // Charger les données utilisateur depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchBooks();
    }
  }, []);

  // Connexion de l'utilisateur
  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    fetchBooks();
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Gestion de l'accès aux pages de mot de passe
  const allowPasswordPageAccess = () => setCanAccessPasswordPages(true);
  const disallowPasswordPageAccess = () => setCanAccessPasswordPages(false);

  // Fonction d'upload d'avatar
  const uploadAvatar = async (avatarFile: File) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => prevUser ? { ...prevUser, avatar: data.avatar } : null);
        localStorage.setItem("user", JSON.stringify({ ...user, avatar: data.avatar }));
      } else {
        console.error("Erreur lors de l'upload de l'avatar");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        uploadAvatar,
        canAccessPasswordPages,
        allowPasswordPageAccess,
        disallowPasswordPageAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;