import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useBooks } from "../context/BookContext";
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddBookTabs from '../components/addbook/AddBookTabs';
import BookSearch from '../components/addbook/BookSearch';
import ManualBookForm from '../components/addbook/ManualBookForm';

const manualSchema = yup.object({
  title: yup.string().required('Le titre est obligatoire'),
  author: yup.string().required("L'auteur est obligatoire"),
  genre: yup.string(),
});

const AddBook = () => {
  const { books, addBook } = useBooks(); // Accéder au contexte global pour les livres
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
  const [successMessage, setSuccessMessage] = useState(""); // État pour le message de succès
  const [tab, setTab] = useState('search');
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY; // Récupère la clé depuis .env

  const methods = useForm({
    resolver: yupResolver(manualSchema),
    defaultValues: { title: '', author: '', genre: '' },
    mode: 'onTouched',
  });
  const { register, handleSubmit, formState: { errors }, setValue } = methods;

  const [coverPreview, setCoverPreview] = useState('');

  const handleCoverFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result);
      setValue('cover', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDropCover = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCoverFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectCover = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleCoverFile(e.target.files[0]);
    }
  };

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

  const onSubmitManual = async (data) => {
    const newBook = { ...data, status: 'À lire' };
    try {
      await addBook(newBook);
      setSuccessMessage(`Le livre "${data.title}" a été ajouté avec succès.`);
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
        <AddBookTabs tab={tab} setTab={setTab} />
        {successMessage && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-teal text-parchment p-3 rounded-lg shadow-lg z-50 transition"
          >
            {successMessage}
          </motion.div>
        )}
        {tab === 'search' && (
          <BookSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={clearSearch}
            isLoading={isLoading}
            searchResults={searchResults}
            handleAddBook={handleAddBook}
          />
        )}
        {tab === 'manual' && (
          <ManualBookForm
            methods={methods}
            onSubmitManual={onSubmitManual}
            errors={errors}
            coverPreview={coverPreview}
            handleDropCover={handleDropCover}
            handleSelectCover={handleSelectCover}
          />
        )}
      </div>
    </div>
  );
};

export default AddBook;
