import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import ReactStars from 'react-rating-stars-component';

function BookList({ books, deleteBook, onUpdateStatus, onUpdateRating }) {
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
                className="bg-white shadow-md rounded-md p-4 flex flex-col items-center dark:bg-gray-800"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold dark:text-white">{book.title}</h3>
                <p className="text-gray-500 dark:text-white">Auteur : {book.author}</p>
                <p className="text-gray-500 dark:text-white">Statut : {book.status}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => onUpdateStatus(book._id || book.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Changer Statut
                  </button>
                  <button
                    onClick={() => deleteBook(book._id || book.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Supprimer
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
    })
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onUpdateRating: PropTypes.func.isRequired,
};

export default BookList;

