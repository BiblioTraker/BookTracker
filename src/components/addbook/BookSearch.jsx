import { motion } from 'framer-motion';
import SkeletonCard from '../ui/SkeletonCard';
import { AiOutlineClose } from 'react-icons/ai';

export default function BookSearch({
  searchTerm,
  setSearchTerm,
  clearSearch,
  isLoading,
  searchResults,
  handleAddBook
}) {
  return (
    <>
      {/* Barre de recherche */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un livre"
          className="border border-sepia p-2 rounded-md w-1/2 bg-parchment text-sepia placeholder-sepia"
        />
        {searchTerm && (
          <AiOutlineClose
            onClick={clearSearch}
            className="ml-2 text-rust cursor-pointer"
            size={24}
          />
        )}
      </div>

      {/* Résultats ou Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {searchResults.map((book) => (
            <motion.div
              key={book.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-parchment text-sepia rounded-2xl shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || ""}
                alt={book.volumeInfo.title}
                className="w-32 h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-heading text-rust mb-2">
                {book.volumeInfo.title}
              </h3>
              <p className="text-sepia mb-4">
                Auteur : {book.volumeInfo.authors?.join(", ") || "Auteur inconnu"}
              </p>
              <button
                onClick={() => handleAddBook(book)}
                className="mt-2 px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition"
              >
                Ajouter
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}