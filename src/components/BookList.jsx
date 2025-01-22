import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import { FaBook, FaBookOpen, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

function BookList({ books, deleteBook, onUpdateStatus, onUpdateRating, onAddComment, onDeleteComment }) {

  const getStatusIcon = (status) => {
    switch (status) {
      case "À lire":
        return <FaBook className="text-yellow-500" />;
      case "En cours":
        return <FaBookOpen className="text-blue-500" />;
      case "Lu":
        return <FaCheck className="text-green-500" />;
      default:
        return null;
    }
  };

  const [commentTexts, setCommentTexts] = useState({});

  const handleAddComment = (bookId) => {
    if (commentTexts[bookId]?.trim() === "") return;
    onAddComment(bookId, commentTexts[bookId]);
    setCommentTexts((prev) => ({ ...prev, [bookId]: "" }));
  };

  const handleCommentChange = (bookId, text) => {
    setCommentTexts((prev) => ({ ...prev, [bookId]: text }));
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
                <button
                  onClick={() => onUpdateStatus(book._id || book.id)}
                  className="absolute top-2 left-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  {getStatusIcon(book.status)}
                </button>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold dark:text-white">{book.title}</h3>
                <p className="text-gray-500 dark:text-white">Auteur : {book.author}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => deleteBook(book._id || book.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 dark:text-white">Note :</label>
                  <ReactStars
                    count={5}
                    value={book.rating || 0}
                    onChange={(newRating) => onUpdateRating(book._id || book.id, newRating)}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="mt-4 w-full">
                <h4 className="text-md font-semibold dark:text-white">Commentaires :</h4>
                  <ul className="list-disc list-inside">
                    {book.comments.map((comment) => (
                      <li key={comment._id} className="text-gray-500 dark:text-white flex justify-between items-center">
                        <span>{comment.text} - <em>{comment.name}</em></span>
                        <button
                          onClick={() => onDeleteComment(book._id || book.id, comment._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        >
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    value={commentTexts[book._id || book.id] || ""}
                    onChange={(e) => handleCommentChange(book._id || book.id, e.target.value)}
                    placeholder="Ajouter un commentaire"
                    className="border border-gray-300 rounded p-2 w-full dark:text-black mt-2"
                  />
                  <button
                    onClick={() => handleAddComment(book._id || book.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Ajouter
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-gray-500">Aucun livre trouvé.</p>
      )}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      cover: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      status: PropTypes.string,
      rating: PropTypes.number,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          user: PropTypes.oneOfType([
            PropTypes.shape({
              name: PropTypes.string,
            }),
            PropTypes.string,
          ]),
          text: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onUpdateRating: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default BookList;