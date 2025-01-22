import { useBooks } from "../context/BookContext";
import { useState } from "react";
import BookList from "../components/BookList";

const Books = () => {
  const { books, deleteBook, updateBookStatus, updateBookRating, addComment, deleteComment } = useBooks();
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sortOption, setSortOption] = useState("titre");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Tous" || book.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "titre") return a.title.localeCompare(b.title);
    if (sortOption === "auteur") return a.author.localeCompare(b.author);
    return 0;
  });

  const handleDeleteBook = async (id) => {
    try {
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

    await updateBookStatus(id, newStatus);
  };

  return (
    <div>
      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par titre ou auteur..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded p-2 w-full dark:text-black"
          />
        </div>
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
          onUpdateRating={updateBookRating}
          onAddComment={addComment}
          onDeleteComment={deleteComment}
        />
      </div>
    </div>
  );
};

export default Books;