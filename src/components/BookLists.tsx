import { motion, AnimatePresence } from "framer-motion";
import ReactStars from "react-rating-stars-component";
import { FaBook, FaBookOpen, FaCheck, FaTrash, FaEdit, FaSave, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import { Book } from "../types/types";


// Définition des props que BookList accepte
interface BookListProps {
  books: Book[];
  deleteBook: (id: string) => void;
  onUpdateStatus: (id: string) => void;
  onUpdateRating: (id: string, rating: number) => void;
  onAddComment: (id: string, text: string) => void;
  onDeleteComment: (bookId: string, commentId: string) => void;
  onUpdateComment: (bookId: string, commentId: string, text: string) => void;
  onToggleForSale: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  deleteBook,
  onUpdateStatus,
  onUpdateRating,
  onAddComment,
  onDeleteComment,
  onUpdateComment,
  onToggleForSale,
}) => {

  // State pour gérer les commentaires
  const [newCommentTexts, setNewCommentTexts] = useState<Record<string, string>>({});
  const [editCommentTexts, setEditCommentTexts] = useState<Record<string, string>>({});
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  // Récupérer l'icône du statut du livre
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "À lire":
        return <FaBook className="text-yellow-500" />;
      case "En cours":
        return <FaBookOpen className="text-blue-500" />;
      case "Lu":
        return <FaCheck className="text-green-500" />;
      case "À acheter":
        return <FaShoppingCart className="text-red-500" />;
      default:
        return null;
    }
  };

  // Ajouter un commentaire
  const handleAddComment = (bookId: string) => {
    if (newCommentTexts[bookId]?.trim() === "") return;
    onAddComment(bookId, newCommentTexts[bookId]);
    setNewCommentTexts((prev) => ({ ...prev, [bookId]: "" }));
  };

  // Changer le texte d'un commentaire
  const handleNewCommentChange = (bookId: string, text: string) => {
    setNewCommentTexts((prev) => ({ ...prev, [bookId]: text }));
  };

  // Éditer un commentaire
  const handleEditComment = (bookId: string, commentId: string, text: string) => {
    setEditingCommentId(commentId);
    setEditCommentTexts((prev) => ({ ...prev, [commentId]: text }));
  };

  // Mettre à jour un commentaire
  const handleUpdateComment = (bookId: string, commentId: string) => {
    if (editCommentTexts[commentId]?.trim() === "") return;
    onUpdateComment(bookId, commentId, editCommentTexts[commentId]);
    setEditingCommentId(null);
    setEditCommentTexts((prev) => ({ ...prev, [commentId]: "" }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ma Liste de Livres</h2>
      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                key={book._id || book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white shadow-md rounded-md p-4 flex flex-col items-center dark:bg-gray-800"
              >
                {/* Bouton statut */}
                <button onClick={() => onUpdateStatus(book._id || book.id)} className="absolute top-2 left-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  {getStatusIcon(book.status)}
                </button>

                {/* Bouton mettre en vente */}
                {(book.status === "À lire" || book.status === "En cours" || book.status === "Lu") && (
                  <button onClick={() => onToggleForSale(book._id || book.id)} className={`absolute top-12 left-2 p-2 rounded-full ${book.isForSale ? "bg-green-500" : "bg-gray-200"} dark:text-green-700`}>
                    <FaDollarSign className={book.isForSale ? "text-white" : "text-gray-500"} />
                  </button>
                )}

                {/* Image et détails du livre */}
                <img src={book.cover} alt={book.title} className="w-32 h-48 object-cover mb-4" />
                <h3 className="text-lg font-semibold dark:text-white">{book.title}</h3>
                <p className="text-gray-500 dark:text-white">Auteur : {book.author}</p>

                {/* Suppression du livre */}
                <button onClick={() => deleteBook(book._id || book.id)} className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white">
                  <FaTrash />
                </button>

                {/* Évaluation */}
                <ReactStars count={5} value={book.rating || 0} onChange={(newRating: number) => onUpdateRating(book._id || book.id, newRating)} size={24} activeColor="#ffd700" />

                {/* Section commentaires */}
                <div className="mt-2">
                  <input
                      type="text"
                      placeholder="Ajouter un commentaire"
                      value={newCommentTexts[book._id || book.id] || ""}
                      onChange={(e) => handleNewCommentChange(book._id || book.id, e.target.value)}
                      className="border border-gray-300 rounded p-2 flex-1 dark:text-black"
                  />
                  <button
                      onClick={() => handleAddComment(book._id || book.id)}
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                      Ajouter
                  </button>
                </div>
                <h4 className="text-md font-semibold dark:text-white mt-4">Commentaires :</h4>
                <ul className="list-disc list-inside">
                {book.comments.map((comment) => (
                  <li key={comment._id} className="text-gray-500 dark:text-white flex justify-between items-center">
                    {editingCommentId === comment._id ? (
                      <>
                        <input
                          type="text"
                          value={editCommentTexts[comment._id] || comment.text}
                          onChange={(e) => setEditCommentTexts((prev) => ({ ...prev, [comment._id]: e.target.value }))}
                          className="border border-gray-300 rounded p-1 dark:text-black"
                        />
                        <button onClick={() => handleUpdateComment(book._id || book.id, comment._id)} className="bg-green-500 text-white px-2 py-1 rounded ml-2">
                          <FaSave />
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{comment.text} - <em>{comment.name}</em></span>
                        <div>
                          <button onClick={() => handleEditComment(book._id || book.id, comment._id, comment.text)} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">
                            <FaEdit />
                          </button>
                          <button onClick={() => onDeleteComment(book._id || book.id, comment._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                            <FaTrash />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              </motion.div>
              
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-gray-500">Aucun livre trouvé.</p>
      )}
    </div>
  );
};


export default BookList;