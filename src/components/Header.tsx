import { useState, useContext, useRef, RefObject, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Library } from "lucide-react";
import AuthContext from "../context/AuthContext";
import { useBooks } from "../context/BookContext";
import imageCompression from "browser-image-compression";
import AvatarEditor from "react-avatar-editor";
import AvatarModal from "./AvatarModal";

// Définition des props du composant Header
interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Définition du type pour AuthContext
interface User {
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  uploadAvatar: (file: File) => Promise<void>;
}

// Définition de BookContext
interface BookContextType {
  resetBooks: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate();
  const { user, logout, uploadAvatar } = useContext(AuthContext) as AuthContextType;
  const { resetBooks } = useBooks() as BookContextType;

  // Gestion des états
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const editorRef = useRef<AvatarEditor>(null!);

  // Gestion de la déconnexion
  const handleLogout = () => {
    navigate("/login");
    logout();
    localStorage.clear();
    resetBooks();
  };

  // Fermer le modal d'édition d'avatar
  const onCloseAvatar = () => {
    setImage(null);
    setIsEditingAvatar(false);
  };

  // Sauvegarder l'avatar après édition
  const saveAvatar = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const dataUrl = canvas.toDataURL();

      setIsUploading(true); // Début du chargement

      const file = await fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => new File([blob], "avatar.png", { type: blob.type }));

      await uploadAvatar(file);

      setIsUploading(false); // Fin du chargement
      setImage(null);
      setIsEditingAvatar(false);
    }
  };

  // Gestion du changement d'image
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifie le format du fichier
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Veuillez télécharger une image au format JPEG, PNG ou GIF.");
      return;
    }

    // Options pour la compression
    const options = {
      maxSizeMB: 1, // Limite de taille à 1MB
      maxWidthOrHeight: 512, // Taille maximale de 512x512 pixels
      useWebWorker: true, // Utilisation de WebWorker pour améliorer les performances
    };

    try {
      // Compression de l'image
      const compressedFile = await imageCompression(file, options);

      // Lecture du fichier compressé pour la prévisualisation
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Mise à jour avec l'URL de l'image compressée
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Erreur lors de la compression :", error);
    }
  };

  // Activer la modification de l'avatar
  const handleEditAvatar = () => {
    setImage(user?.avatar ? `${import.meta.env.VITE_API_URL}${user.avatar}` : null);
    setIsEditingAvatar(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg dark:from-purple-800 dark:to-indigo-800">
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
                <li>
                  <Link to="/statistics" className="hover:underline">Statistiques</Link>
                </li>
              </div>
              <div className="ml-4 flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-sm">Bienvenue, {user.name} !</span>
                    <img
                      src={user?.avatar ? `${import.meta.env.VITE_API_URL}${user.avatar}` : "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={handleEditAvatar}
                    />
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Connexion
                  </Link>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 ml-4 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </ul>
          </nav>
        </div>
      </div>
      <AvatarModal
        isEditingAvatar={isEditingAvatar}
        editorRef={editorRef}
        image={image || ""}
        handleFileChange={handleFileChange}
        onCloseAvatar={onCloseAvatar}
        saveAvatar={saveAvatar}
        isUploading={isUploading}
      />
    </header>
  );
};

export default Header;
