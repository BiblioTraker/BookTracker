import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from './ToastContext';

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const { addToast } = useToast();

  const fetchBooks = () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;

    if (!token) {
      setBooks([]);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${API_URL}/api/books`, config)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livres :", error);
        setBooks([]);
      });
  };

  const addBook = (newBook) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${API_URL}/api/books`, newBook, config)
      .then((response) => {
        setBooks((prevBooks) => [...prevBooks, response.data]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du livre :", error);
        addToast({ message: "Échec de l’ajout du livre", type: 'error' });
      });
  };

  const deleteBook = (id) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${API_URL}/api/books/${id}`, config)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        addToast({ message: 'Livre supprimé !', type: 'success' });
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du livre :", error);
        addToast({ message: "Échec de la suppression du livre", type: 'error' });
      });
  };

  const updateBookStatus = (id, newStatus) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(`${API_URL}/api/books/${id}`, { status: newStatus }, config)
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id ? { ...book, status: response.data.status } : book
          )
        );
        addToast({ message: `Le livre est "${response.data.status}"`, type: 'success' });
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du statut :", error);
        addToast({ message: "Échec de la mise à jour du statut", type: 'error' });
      });
  };

  const updateBookRating = (id, rating) => {
    const ratingNumber = parseInt(rating);
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `${API_URL}/api/books/${id}/rating`,
        { rating: ratingNumber },
        config
      )
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id ? { ...book, rating: response.data.rating } : book
          )
        );
        addToast({ message: 'Note mise à jour !', type: 'success' });
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la note :", error);
        addToast({ message: "Échec de la mise à jour de la note", type: 'error' });
      });
  };

  const addComment = (bookId, text) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${API_URL}/api/books/${bookId}/comments`, { text }, config)
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId
              ? { ...book, comments: response.data.comments }
              : book
          )
        );
        addToast({ message: 'Commentaire ajouté !', type: 'success' });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du commentaire :", error);
        addToast({ message: "Échec de l’ajout du commentaire", type: 'error' });
      });
  };

  const deleteComment = (bookId, commentId) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${API_URL}/api/books/${bookId}/comments/${commentId}`, config)
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId
              ? { ...book, comments: response.data.comments }
              : book
          )
        );
        addToast({ message: 'Commentaire supprimé !', type: 'success' });
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du commentaire :", error);
        addToast({ message: "Échec de la suppression du commentaire", type: 'error' });
      });
  };

  const updateComment = (bookId, commentId, text) => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        `${API_URL}/api/books/${bookId}/comments/${commentId}`,
        { text },
        config
      )
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId
              ? { ...book, comments: response.data.comments }
              : book
          )
        );
        addToast({ message: 'Commentaire mis à jour !', type: 'success' });
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du commentaire :", error);
        addToast({ message: "Échec de la mise à jour du commentaire", type: 'error' });
      });
  };

  const toggleForSale = (id) => {
    console.log("ID transmis :", id);

    const token = JSON.parse(localStorage.getItem("user")).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${API_URL}/api/books/${id}/for-sale`, {}, config)
      .then((response) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id
              ? { ...book, isForSale: response.data.isForSale }
              : book
          )
        );
        addToast({ message: "Statut de vente mis à jour !", type: 'success' });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du statut 'À vendre' :",
          error
        );
        addToast({ message: "Échec de la mise à jour du statut de vente", type: 'error' });
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        fetchBooks,
        addBook,
        deleteBook,
        updateBookStatus,
        updateBookRating,
        addComment,
        deleteComment,
        updateComment,
        toggleForSale,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
