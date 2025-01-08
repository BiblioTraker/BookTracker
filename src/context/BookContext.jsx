import { createContext, useContext, useState, useEffect } from "react";

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    try {
      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error("Erreur lors du parsing de localStorage :", error);
      return [];
    }
  });

  // Sauvegarder les livres dans localStorage à chaque mise à jour
  useEffect(() => {
    try {
      localStorage.setItem("books", JSON.stringify(books));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde dans localStorage :", error);
    }
  }, [books]);
  
  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

