import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useBooks } from "../context/BookContext";
import { AiOutlineClose } from 'react-icons/ai';

// Interface pour un livre provenant de Google Books API
interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

// Interface pour un livre stocké dans le contexte
interface Book {
  id?: string;
  title: string;
  author: string;
  cover: string;
  status: "À lire" | "En cours" | "Lu" | "À acheter";
}

// Composant principal
const AddBook: React.FC = () => {
  const { addBook } = useBooks(); // Utilisation du contexte BookContext
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  // État pour l'ajout manuel d'un livre
  const [manualBook, setManualBook] = useState<Book>({
    title: "",
    author: "",
    cover: "",
    status: "À lire",
  });

  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  // Débouncing et recherche de livres avec Google Books API
  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        alert("Impossible de récupérer les résultats. Vérifiez votre clé API.");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchBooks, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, API_KEY]);

  // Ajouter un livre depuis les résultats Google Books
  const handleAddBook = (book: GoogleBook) => {
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", ") || "Auteur inconnu",
      cover: book.volumeInfo.imageLinks?.thumbnail || "",
      status: "À lire" as const,
    };

    addBook(newBook);
    setSuccessMessage(`Le livre "${newBook.title}" a été ajouté avec succès.`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Ajouter un livre manuellement
  const handleAddManualBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!manualBook.title.trim() || !manualBook.author.trim()) {
      alert("Le titre et l'auteur sont obligatoires.");
      return;
    }

    try {
      await addBook(manualBook);
      setSuccessMessage(`Le livre "${manualBook.title}" a été ajouté avec succès.`);
      setManualBook({ title: "", author: "", cover: "", status: "À lire" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout manuel du livre :", error);
      alert("Une erreur est survenue lors de l'ajout du livre.");
    }
  };

  // Effacer la recherche
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };
  
  return (
    <div className="p-4 mt-8 bg-gray-100 dark:bg-gray-900 dark:text-white">
    <div className="p-4 mt-8 bg-white dark:bg-gray-700 dark:text-gray-200 rounded shadow-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Livre</h2>
      {/* Recherche de livres */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un livre"
          className="border border-gray-300 rounded p-2 w-1/2 dark:text-black"
        />
        {searchTerm && (
          <AiOutlineClose
          onClick={clearSearch}
          className="ml-2 text-red-500 cursor-pointer"
          size={24}
        />
        )}
      </div>
      {isLoading && <p className="text-gray-500">Recherche en cours...</p>}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 p-3 rounded shadow-lg z-50"
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
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Ajouter un Livre Manuellement</h3>
        <form onSubmit={handleAddManualBook} className="space-y-4">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Titre"
            value={manualBook.title}
            onChange={(e) => setManualBook({ ...manualBook, title: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Auteur"
            value={manualBook.author}
            onChange={(e) => setManualBook({ ...manualBook, author: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
          <input
            type="text"
            id="cover"
            name="cover"
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
    </div>
  );
};

export default AddBook;

