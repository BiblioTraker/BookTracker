import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Book } from "../types/types";

// Définition du type du contexte Books
interface BooksContextType {
  books: Book[];
  fetchBooks: () => void;
  addBook: (newBook: Partial<Omit<Book, "_id">>) => void;
  deleteBook: (id: string) => void | Promise<void>;
  updateBookStatus: (id: string, newStatus: string) => void | Promise<void>;
  updateBookRating: (id: string, rating: number) => void;
  addComment: (bookId: string, text: string) => void;
  deleteComment: (bookId: string, commentId: string) => void;
  updateComment: (bookId: string, commentId: string, text: string) => void;
  toggleForSale: (id: string) => void | Promise<void>;
}

// Création du contexte avec une valeur par défaut
const BooksContext = createContext<BooksContextType | undefined>(undefined);

// Définition des props du BooksProvider
interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fonction pour récupérer les livres
  const fetchBooks = () => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    if (!token) {
      setBooks([]);
      return;
    }

    axios
      .get(`${API_URL}/api/books`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setBooks(response.data))
      .catch(() => setBooks([]));
  };

  // Ajouter un livre
  const addBook = (newBook: Partial<Omit<Book, "_id">>) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .post(`${API_URL}/api/books`, newBook, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setBooks((prevBooks) => [...prevBooks, response.data]))
      .catch((error) => console.error("Erreur lors de l'ajout du livre :", error));
  };

  // Supprimer un livre
  const deleteBook = (id: string) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .delete(`${API_URL}/api/books/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)))
      .catch((error) => console.error("Erreur lors de la suppression du livre :", error));
  };

  // Mettre à jour le statut d'un livre
  const updateBookStatus = (id: string, newStatus: string) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .put(`${API_URL}/api/books/${id}`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) =>
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === id ? { ...book, status: response.data.status } : book))
        )
      )
      .catch((error) => console.error("Erreur lors de la mise à jour du statut :", error));
  };

  // Mettre à jour la note d'un livre
  const updateBookRating = (id: string, rating: number) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .put(`${API_URL}/api/books/${id}/rating`, { rating }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) =>
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === id ? { ...book, rating: response.data.rating } : book))
        )
      )
      .catch((error) => console.error("Erreur lors de la mise à jour de la note :", error));
  };

  // Ajouter un commentaire
  const addComment = (bookId: string, text: string) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .post(`${API_URL}/api/books/${bookId}/comments`, { text }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) =>
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === bookId ? { ...book, comments: response.data.comments } : book))
        )
      )
      .catch((error) => console.error("Erreur lors de l'ajout du commentaire :", error));
  };

  // Supprimer un commentaire
  const deleteComment = (bookId: string, commentId: string) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .delete(`${API_URL}/api/books/${bookId}/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) =>
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === bookId ? { ...book, comments: response.data.comments } : book))
        )
      )
      .catch((error) => console.error("Erreur lors de la suppression du commentaire :", error));
  };

  // Mise à jour d'un commentaire
  const updateComment = (bookId: string, commentId: string, text: string) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    axios
      .put(`${API_URL}/api/books/${bookId}/comments/${commentId}`, { text }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) =>
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === bookId ? { ...book, comments: response.data.comments } : book))
        )
      )
      .catch((error) => console.error("Erreur lors de la mise à jour du commentaire :", error));
  };

  // Fonction pour activer/désactiver la vente d'un livre
const toggleForSale = (id: string) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  axios
    .put(`${API_URL}/api/books/${id}/for-sale`, {}, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) =>
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === id ? { ...book, isForSale: response.data.isForSale } : book))
      )
    )
    .catch((error) => console.error("Erreur lors de la mise à jour du statut de vente :", error));
};

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, fetchBooks, addBook, deleteBook, updateBookStatus, updateBookRating, addComment, deleteComment, updateComment, toggleForSale }}>
      {children}
    </BooksContext.Provider>
  );
};

// Hook personnalisé pour utiliser BooksContext
export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks doit être utilisé dans un BooksProvider");
  }
  return context;
};

export default BooksContext;