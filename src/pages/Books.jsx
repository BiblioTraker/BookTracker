import { useBooks } from "../context/BookContext";
import { useState } from "react";
import BookList from "../components/BookList";

const Books = () => {
  const { books, deleteBook, updateBookStatus } = useBooks(); // Correction : utiliser deleteBook et updateBookStatus du contexte
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sortOption, setSortOption] = useState("titre");

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filtrer les livres
  const filteredBooks = books.filter((book) => {
    if (filterStatus === "Tous") return true;
    return book.status === filterStatus;
  });

  // Trier les livres
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "titre") return a.title.localeCompare(b.title);
    if (sortOption === "auteur") return a.author.localeCompare(b.author);
    return 0;
  });

  // Suppression d'un livre via le contexte
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id); // Appel à la fonction du contexte pour supprimer le livre
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  };

  // Mise à jour du statut d'un livre via le contexte
  const handleUpdateStatus = async (id) => {
    console.log("ID reçu pour mise à jour du statut :", id);
  
    // Trouver le livre correspondant
    const book = books.find((book) => book._id === id || book.id === id);
    if (!book) {
      console.error("Livre introuvable pour l'ID :", id);
      return;
    }
  
    // Définir le prochain statut
    let newStatus;
    if (book.status === "À lire") newStatus = "En cours";
    else if (book.status === "En cours") newStatus = "Lu";
    else if (book.status === "Lu") newStatus = "À lire";
    else {
      console.error("Statut actuel invalide :", book.status);
      return;
    }
  
    console.log("Nouveau statut calculé :", newStatus);
  
    // Appeler la fonction du contexte pour envoyer la requête PUT
    await updateBookStatus(id, newStatus);
  };
  

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 dark:text-black">
          {/* Filtre */}
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
          {/* Tri */}
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
          onDeleteBook={handleDeleteBook} // Supprime un livre
          onUpdateStatus={handleUpdateStatus} // Passe la fonction handleUpdateStatus
        />

      </div>
    </div>
  );
};

export default Books;
