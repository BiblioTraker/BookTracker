import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const AddBook = ({ onAddBook }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
  const [successMessage, setSuccessMessage] = useState(""); // État pour le message de succès
  const [manualBook, setManualBook] = useState({
    title: "",
    author: "",
    genre: "",
    cover: "",
    status: "À lire",
  });

  const handleSearch = async () => {
    setIsLoading(true); // Début du chargement
    setSearchResults([]); // Réinitialiser les résultats
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Empêche le rechargement ou comportement par défaut
      handleSearch();
    }
  };
  // Fonction pour ajouter un livre depuis les resultats
  const handleAddBook = (book) => {
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", ") || "Auteur inconnu",
      cover: book.volumeInfo.imageLinks?.thumbnail || "",
      status: "À lire",
    };
    onAddBook(newBook);

    // Afficher le message de succès
    setSuccessMessage(`Le livre "${newBook.title}" a été ajouté avec succès.`);
    setTimeout(() => setSuccessMessage(""), 3000); // Effacer le message après 3 secondes
  };

  const handleAddManualBook = (e) => {
    e.preventDefault();
    if (!manualBook.title.trim() || !manualBook.author.trim()) {
      alert("Le titre et l'auteur sont obligatoires.");
      return;
    }
    const newBook = {
      id: Date.now().toString(),
      ...manualBook,
    };
    onAddBook(newBook);
    setSuccessMessage(`Le livre "${manualBook.title}" a été ajouté avec succès.`);
    setManualBook({
      title: "",
      author: "",
      genre: "",
      cover: "",
      status: "À lire",
    });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const storageAddBook = async (newBook) => {
    const user = auth.currentUser;
    if (user) {
      const bookRef = doc(db, "books", `${user.uid}_${newBook.id}`);
      await setDoc(bookRef, {
        ...newBook,
        userId: user.uid,
      });
      setSuccessMessage(`Le livre "${newBook.title}" a été ajouté.`);
    }
  };
  


  return (
    <div className="p-4 mt-8 bg-white dark:bg-gray-700 dark:text-gray-200 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Livre</h2>
      {/* Recherche de livres */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un livre"
          className="border border-gray-300 rounded p-2 w-full text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Rechercher
        </button>
      </div>
      {/* Barre de chargement */}
      {isLoading && <p className="text-gray-500">Recherche en cours...</p>}
      {/* Message de succès */}
      {successMessage && (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-green-100 text-green-800 p-2 rounded my-4"
      >
        {successMessage}
      </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {searchResults.map((book) => (
          <motion.div
          key={book.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-md rounded-md p-4 flex flex-col items-center"
        >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ""}
              alt={book.volumeInfo.title}
              className="w-32 h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-black">{book.volumeInfo.title}</h3>
            <p className="text-gray-500">
              Auteur : {book.volumeInfo.authors?.join(", ") || "Auteur inconnu"}
            </p>
            <button
              onClick={() => handleAddBook(book)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Ajouter
            </button>
            </motion.div>
        ))}
      </motion.div>
         {/* Formulaire d'ajout manuel */}
        <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Ajouter un Livre Manuellement</h3>
        <form onSubmit={handleAddManualBook} className="space-y-4">
          <input
            type="text"
            placeholder="Titre"
            value={manualBook.title}
            onChange={(e) => setManualBook({ ...manualBook, title: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
          <input
            type="text"
            placeholder="Auteur"
            value={manualBook.author}
            onChange={(e) => setManualBook({ ...manualBook, author: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
          <input
            type="text"
            placeholder="Genre"
            value={manualBook.genre}
            onChange={(e) => setManualBook({ ...manualBook, genre: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
          <input
            type="text"
            placeholder="URL de la couverture (facultatif)"
            value={manualBook.cover}
            onChange={(e) => setManualBook({ ...manualBook, cover: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Ajouter le Livre
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
