import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

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
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du livre :", error);
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
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du statut :", error);
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
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la note :", error);
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
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du commentaire :", error);
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
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du commentaire :", error);
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
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du commentaire :", error);
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
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour du statut 'À vendre' :",
          error
        );
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
