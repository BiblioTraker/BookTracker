import { motion, AnimatePresence } from "framer-motion";

function BookList({ books, onDeleteBook, onUpdateStatus }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ma Liste de Livres</h2>
      {books && books.length > 0 ? (
        <AnimatePresence>
          {books.map((book) => (
            <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-md p-4 flex flex-col items-center mb-4 dark:bg-gray-800"
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
                  onClick={() => onUpdateStatus(book.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Changer Statut
                </button>
                <button
                  onClick={() => onDeleteBook(book.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Supprimer
                </button>
              </div>
              </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <p className="text-gray-500">Aucun livre trouvé.</p>
      )}
    </div>
  );
}

export default BookList;
