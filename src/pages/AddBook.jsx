import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useBooks } from "../context/BookContext";
import { AiOutlineClose } from 'react-icons/ai';

const AddBook = () => {
  const { books, setBooks, addBook } = useBooks(); // Accéder au contexte global pour les livres
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
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY; // Récupère la clé depuis .env

  useEffect(() => {
    // Débouncing pour la recherche
    const fetchBooks = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsLoading(true); // Début du chargement
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchTerm
          )}&key=${API_KEY}`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        alert("Impossible de récupérer les résultats. Vérifiez votre clé API.");
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchBooks();
    }, 500); // Lance la recherche après 500ms

    return () => clearTimeout(debounceTimeout); // Nettoie le timeout si le terme de recherche change rapidement
  }, [searchTerm, API_KEY]);

  // Fonction pour ajouter un livre depuis les résultats
  const handleAddBook = (book) => {
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", ") || "Auteur inconnu",
      cover: book.volumeInfo.imageLinks?.thumbnail || "",
      status: "À lire",
    };
    addBook(newBook); // Appeler la fonction addBook du contexte
    // Afficher le message de succès
    setSuccessMessage(`Le livre "${newBook.title}" a été ajouté avec succès.`);
    setTimeout(() => setSuccessMessage(""), 3000); // Effacer le message après 3 secondes
  };

  const handleAddManualBook = async (e) => {
    e.preventDefault();
    if (!manualBook.title.trim() || !manualBook.author.trim()) {
      alert("Le titre et l'auteur sont obligatoires.");
      return;
    }

    const newBook = {
      title: manualBook.title,
      author: manualBook.author,
      genre: manualBook.genre || "Inconnu",
      cover: manualBook.cover || "",
      status: "À lire",
    };

    try {
      await addBook(newBook);

      setSuccessMessage(`Le livre "${newBook.title}" a été ajouté avec succès.`);
      setManualBook({
        title: "",
        author: "",
        genre: "",
        cover: "",
        status: "À lire",
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout manuel du livre :", error);
      alert("Une erreur est survenue lors de l'ajout du livre.");
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen p-6 bg-parchment text-sepia">
    <div className="p-6 mt-8 bg-parchment text-sepia rounded-2xl shadow-lg mx-4 sm:mx-8 md:mx-16 lg:mx-32">
      <h2 className="text-3xl font-heading text-rust mb-6">Ajouter un Livre</h2>
      {/* Recherche de livres */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un livre"
          className="border border-sepia p-2 rounded-md w-1/2 bg-parchment text-sepia placeholder-sepia"
        />
        {searchTerm && (
          <AiOutlineClose
          onClick={clearSearch}
          className="ml-2 text-rust cursor-pointer"
          size={24}
        />
        )}
      </div>
      {isLoading && <p className="text-sepia">Recherche en cours...</p>}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-teal text-parchment p-3 rounded-lg shadow-lg z-50 transition"
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
            className="bg-parchment text-sepia rounded-2xl shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || ""}
              alt={book.volumeInfo.title}
              className="w-32 h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-heading text-rust mb-2">{book.volumeInfo.title}</h3>
            <p className="text-sepia mb-4">
              Auteur : {book.volumeInfo.authors?.join(", ") || "Auteur inconnu"}
            </p>
            <button
              onClick={() => handleAddBook(book)}
              className="mt-2 px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition"
            >
              Ajouter
            </button>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-8">
        <h3 className="text-2xl font-heading text-rust mb-6">Ajouter un Livre Manuellement</h3>
        <form onSubmit={handleAddManualBook} className="space-y-4">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Titre"
            value={manualBook.title}
            onChange={(e) => setManualBook({ ...manualBook, title: e.target.value })}
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia"
          />
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Auteur"
            value={manualBook.author}
            onChange={(e) => setManualBook({ ...manualBook, author: e.target.value })}
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia"
          />
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre"
            value={manualBook.genre}
            onChange={(e) => setManualBook({ ...manualBook, genre: e.target.value })}
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia"
          />
          <input
            type="text"
            id="cover"
            name="cover"
            placeholder="URL de la couverture (facultatif)"
            value={manualBook.cover}
            onChange={(e) => setManualBook({ ...manualBook, cover: e.target.value })}
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition"
          >
            Ajouter le Livre
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddBook;
