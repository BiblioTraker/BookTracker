import { useBooks } from "../context/BookContext";
import { useState, useRef } from "react";
import BookList from "../components/BookList";
import Statistics from '../components/Statistics';

const Books = () => {
  const { books, deleteBook, updateBookStatus, updateBookRating, addComment, deleteComment, updateComment, toggleForSale } = useBooks();
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sortOption, setSortOption] = useState("titre");
  const [searchTerm, setSearchTerm] = useState("");
  const bookListRef = useRef(null); // Référence pour la liste de livres

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatisticFilter = (status) => {
    setFilterStatus(status);
    bookListRef.current.scrollIntoView({ behavior: "smooth" }); // Faire défiler vers la liste de livres
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
    else if (book.status === "Lu") newStatus = "À acheter";
    else newStatus = "À lire";

    await updateBookStatus(id, newStatus);
  };

  const handleToggleForSale = async (id) => {
    try {
      await toggleForSale(id);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut 'À vendre' :", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-parchment text-sepia">
      <div className="mt-8">
        <Statistics books={books} onFilter={handleStatisticFilter} />
      </div>
      <div className="mt-8 p-6 bg-parchment rounded-2xl shadow-lg" ref={bookListRef} id="book-list">
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher un de vos livres"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-sepia p-2 rounded-md w-1/3 bg-parchment text-sepia placeholder-sepia"
          />
        </div>
        <div className="flex justify-start items-center mb-4">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="border border-sepia p-2 rounded-md mr-8 bg-parchment text-sepia"
          >
            <option value="Tous">Tous</option>
            <option value="Lu">Lu</option>
            <option value="En cours">En cours</option>
            <option value="À lire">À lire</option>
            <option value="À acheter">À acheter</option>
            <option value="À vendre">À vendre</option>
          </select>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-sepia p-2 rounded-md bg-parchment text-sepia"
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
          onUpdateComment={updateComment}
          onToggleForSale={handleToggleForSale}
        />
      </div>
    </div>
  );
};

export default Books;