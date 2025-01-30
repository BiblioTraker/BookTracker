import { useBooks } from "../context/BookContext";
import { useState, useRef, ChangeEvent } from "react";
import BookList from "../components/BookLists";
import Statistics from "../components/Statistics";
import { Book } from "../types/types";

// Interface pour les données exposées par le contexte Books
interface BooksContextType {
  books: Book[];
  deleteBook: (id: string) => Promise<void>;
  updateBookStatus: (id: string, newStatus: string) => Promise<void>;
  updateBookRating: (id: string, rating: number) => void;
  addComment: (bookId: string, text: string) => void;
  deleteComment: (bookId: string, commentId: string) => void;
  updateComment: (bookId: string, commentId: string, text: string) => void;
  toggleForSale: (id: string) => Promise<void>;
}

const Books: React.FC = () => {
  const {
    books,
    deleteBook,
    updateBookStatus,
    updateBookRating,
    addComment,
    deleteComment,
    updateComment,
    toggleForSale,
  } = useBooks() as BooksContextType;

  const [filterStatus, setFilterStatus] = useState<string>("Tous");
  const [sortOption, setSortOption] = useState<string>("titre");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const bookListRef = useRef<HTMLDivElement | null>(null); // Référence pour la liste de livres

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatisticFilter = (status: string) => {
    setFilterStatus(status);
    bookListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Tous" || book.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "titre") return a.title.localeCompare(b.title);
    if (sortOption === "auteur") return a.author.localeCompare(b.author);
    return 0;
  });

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };

  const handleUpdateStatus = async (id: string) => {
    const book = books.find((book) => book._id === id || book.id === id);
    if (!book) {
      console.error("Livre introuvable pour cet ID :", id);
      return;
    }

    const statusOrder: { [key: string]: string } = {
      "À lire": "En cours",
      "En cours": "Lu",
      "Lu": "À acheter",
      "À acheter": "À lire",
      "À vendre": "À lire",
    };

    const newStatus = statusOrder[book.status] || "À lire";

    await updateBookStatus(id, newStatus);
  };

  const handleToggleForSale = async (id: string) => {
    try {
      await toggleForSale(id);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut 'À vendre' :", error);
    }
  };

  return (
    <div>
      <div className="mt-8">
        <Statistics books={books} onFilter={handleStatisticFilter} />
      </div>
      <div className="p-4" ref={bookListRef} id="book-list">
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher un de vos livres"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded p-2 w-1/3 dark:text-black"
          />
        </div>
        <div className="flex justify-start items-center mb-4 dark:text-black">
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded p-2 mr-8"
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
          onUpdateComment={updateComment}
          onToggleForSale={handleToggleForSale}
        />
      </div>
    </div>
  );
};

export default Books;