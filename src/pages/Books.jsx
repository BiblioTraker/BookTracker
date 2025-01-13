import { useBooks } from "../context/BookContext";
import { useState } from "react";
import BookList from "../components/BookList";

const Books = () => {
  const { books, deleteBook, updateBookStatus } = useBooks();
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sortOption, setSortOption] = useState("titre");

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    if (filterStatus === "Tous") return true;
    return book.status === filterStatus;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "titre") return a.title.localeCompare(b.title);
    if (sortOption === "auteur") return a.author.localeCompare(b.author);
    return 0;
  });

  const handleDeleteBook = async (id) => {
    try {
      console.log("Suppression du livre avec ID :", id); // Log pour déboguer
      await deleteBook(id);
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };
  
  const handleUpdateStatus = async (id) => {
    const book = books.find((book) => book._id === id || book.id === id);
    if (!book) {
      console.error("Livre introuvable pour cet ID :", id);
      return;
    }
  
    let newStatus;
    if (book.status === "À lire") newStatus = "En cours";
    else if (book.status === "En cours") newStatus = "Lu";
    else newStatus = "À lire";
  
    console.log("Mise à jour du statut pour l'ID :", id, "Nouveau statut :", newStatus);
    await updateBookStatus(id, newStatus);
  };
  

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 dark:text-black">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="Tous">Tous</option>
            <option value="Lu">Lu</option>
            <option value="En cours">En cours</option>
            <option value="À lire">À lire</option>
          </select>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="titre">Titre</option>
            <option value="auteur">Auteur</option>
          </select>
        </div>
        <BookList
          books={sortedBooks}
          deleteBook={handleDeleteBook}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </div>
  );
};

export default Books;
