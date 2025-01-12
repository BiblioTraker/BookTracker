import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Charger les livres depuis le backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/books`);
      setBooks(response.data);
      console.log("Livres récupérés depuis le backend :", books);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
    }
  };

  // Ajouter un livre au backend
  const addBook = async (newBook) => {
    try {
      const response = await axios.post(`${API_URL}/api/books`, newBook);
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

  // Supprimer un livre du backend
  const deleteBook = async (id) => {
    try {
      console.log('Suppression du livre avec ID :', id);
      await axios.delete(`${API_URL}/api/books/${id}`);
      // Met à jour l'état local pour refléter la suppression
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      console.log("Livre supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };
  
  
  // Mettre à jour le statut d'un livre
  const updateBookStatus = async (id, newStatus) => {
    try {
      console.log("Requête PUT pour ID :", id, "avec le statut :", newStatus);
      console.log("Corps de la requête PUT :", { status: newStatus });
      const response = await axios.put(
        `${API_URL}/api/books/${id}`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("Réponse du backend :", response.data);
  
      // Mettre à jour localement
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, status: response.data.status } : book
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };
  
  
  

  // Charger les livres au montage du composant
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        addBook,
        deleteBook,
        updateBookStatus,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

