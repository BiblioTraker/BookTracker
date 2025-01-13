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
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_URL}/api/books`, config);
      setBooks(response.data);
      console.log("Livres récupérés depuis le backend :", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
    }
  };

  // Ajouter un livre au backend
  const addBook = async (newBook) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${API_URL}/api/books`, newBook, config);
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

  // Supprimer un livre du backend
  const deleteBook = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      console.log("URL de suppression :", `${API_URL}/api/books/${id}`);
      await axios.delete(`${API_URL}/api/books/${id}`, config);
  
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      console.log("Livre supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };
  

  // Mettre à jour le statut d'un livre
  const updateBookStatus = async (id, newStatus) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
  
      console.log("URL de mise à jour :", `${API_URL}/api/books/${id}`);
      const response = await axios.put(
        `${API_URL}/api/books/${id}`,
        { status: newStatus },
        config
      );
  
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, status: response.data.status } : book
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };
  

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


