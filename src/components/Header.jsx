import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Library } from "lucide-react";
import AuthContext from "../context/AuthContext";
import { useBooks } from "../context/BookContext";
import imageCompression from "browser-image-compression";
import AvatarModal from "./AvatarModal";

function Header({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();
  const { user, logout, uploadAvatar } = useContext(AuthContext);
  const { resetBooks } = useBooks();

  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const editorRef = useRef(null);

  const handleLogout = () => {
    navigate("/login");
    logout();
    localStorage.clear();
    resetBooks();
  };

  const onCloseAvatar = () => {
    setImage(null); // Réinitialise l'image
    setIsEditingAvatar(false); // Ferme le modal
  };

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
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
        setImage(reader.result); // Met à jour l'état avec la prévisualisation de l'image
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Erreur lors de la compression :", error);
    }
  };

  const handleEditAvatar = () => {
    setImage(user?.avatar && `${import.meta.env.VITE_API_URL}${user.avatar}`);
    setIsEditingAvatar(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-white shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Library className="w-8 h-8" />
            <Link to="/" className="text-xl font-bold hover:underline">
              BiblioTracker
            </Link>
          </div>
          <nav className="p-4">
            <ul className="flex items-center justify-between">
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
              <div className="flex items-center ml-4 space-x-4">
                {user ? (
                  <>
                    <span className="text-sm">Bienvenue, {user.name} !</span>
                    <img
                      src={
                        user?.avatar
                          ? `${import.meta.env.VITE_API_URL}${user.avatar}`
                          : `${
                              import.meta.env.VITE_API_URL
                            }/uploads/avatars/default-avatar.png`
                      }
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={handleEditAvatar}
                    />
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Connexion
                  </Link>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 ml-4 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
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
      <AvatarModal
        isEditingAvatar={isEditingAvatar}
        editorRef={editorRef}
        image={image}
        handleFileChange={handleFileChange}
        onCloseAvatar={onCloseAvatar}
        saveAvatar={saveAvatar}
        isUploading={isUploading}
      />
    </header>
  );
}

export default Header;
