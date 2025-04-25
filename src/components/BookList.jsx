import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import { FaTrash, FaEdit, FaSave, FaShareAlt, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { toJpeg } from "html-to-image";
import StatusToggle from './StatusToggle';
import SaleToggle from './SaleToggle';

function BookList({ books, deleteBook, onUpdateStatus, onUpdateRating, onAddComment, onDeleteComment, onUpdateComment, onToggleForSale }) {

  const cardRefs = useRef({});

  const [newCommentTexts, setNewCommentTexts] = useState({});
  const [editCommentTexts, setEditCommentTexts] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleAddComment = (bookId) => {
    if (newCommentTexts[bookId]?.trim() === "") return;
    onAddComment(bookId, newCommentTexts[bookId]);
    setNewCommentTexts((prev) => ({ ...prev, [bookId]: "" }));
  };

  const handleNewCommentChange = (bookId, text) => {
    setNewCommentTexts((prev) => ({ ...prev, [bookId]: text }));
  };

  const handleEditComment = (bookId, commentId, text) => {
    setEditingCommentId(commentId);
    setEditCommentTexts((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleEditCommentChange = (commentId, text) => {
    setEditCommentTexts((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleUpdateComment = (bookId, commentId) => {
    if (editCommentTexts[commentId]?.trim() === "") return;
    onUpdateComment(bookId, commentId, editCommentTexts[commentId]);
    setEditingCommentId(null);
    setEditCommentTexts((prev) => ({ ...prev, [commentId]: "" }));
  };

  return (
    <div className="min-h-screen p-6 bg-parchment text-sepia">
      <h2 className="text-3xl font-heading text-rust mb-6">Ma Liste de Livres</h2>
      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                ref={el => { cardRefs.current[book._id || book.id] = el; }}
                key={book._id || book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-parchment text-sepia rounded-2xl shadow-lg p-6 flex flex-col items-center"
              >
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <button
                    onClick={() => deleteBook(book._id || book.id)}
                    className="p-2 rounded-full bg-rust text-parchment transition hover:bg-teal"
                    title="Supprimer ce livre"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={async () => {
                      console.log('Share button clicked for book:', book.title);
                      const id = book._id || book.id;
                      const node = cardRefs.current[id];
                      if (!node) {
                        console.error('Share failed: no DOM node found for', book.title);
                        return;
                      }
                      try {
                        const dataUrl = await toJpeg(node, { quality: 0.95 });
                        const blob = await (await fetch(dataUrl)).blob();
                        const file = new File([blob], `${book.title}.jpg`, { type: 'image/jpeg' });
                        if (navigator.share) {
                          await navigator.share({ files: [file], title: book.title });
                        } else {
                          const link = document.createElement('a');
                          link.href = dataUrl;
                          link.download = `${book.title}.jpg`;
                          link.click();
                        }
                      } catch (error) {
                        console.error('Error sharing card:', error);
                      }
                    }}
                    className="p-2 rounded-full bg-sepia text-parchment transition hover:bg-rust"
                    title="Partager cette carte"
                  >
                    <FaShareAlt />
                  </button>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/books/${book._id || book.id}`;
                      const text = `Découvrez "${book.title}" de ${book.author}`;
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                        '_blank'
                      );
                    }}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                    title="Partager sur X"
                  >
                    <FaTwitter />
                  </button>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/books/${book._id || book.id}`;
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                        '_blank'
                      );
                    }}
                    className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
                    title="Partager sur Facebook"
                  >
                    <FaFacebook />
                  </button>
                  <button
                    onClick={async () => {
                      const id = book._id || book.id;
                      const node = cardRefs.current[id];
                      if (node) {
                        try {
                          const dataUrl = await toJpeg(node, { quality: 0.95 });
                          const link = document.createElement('a');
                          link.href = dataUrl;
                          link.download = `${book.title}.jpg`;
                          link.click();
                          alert('Image téléchargée. Vous pouvez maintenant la partager sur Instagram.');
                        } catch (error) {
                          console.error('Error preparing Instagram share:', error);
                        }
                      }
                    }}
                    className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
                    title="Préparer pour Instagram"
                  >
                    <FaInstagram />
                  </button>
                </div>
                <StatusToggle
                  status={book.status}
                  onClick={() => onUpdateStatus(book._id || book.id)}
                />
                {(book.status === "À lire" || book.status === "En cours" || book.status === "Lu") && (
                    <SaleToggle
                      isForSale={book.isForSale}
                      onClick={() => onToggleForSale(book._id || book.id)}
                    />
                  )}
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-heading text-rust">{book.title}</h3>
                <p className="text-sepia">Auteur : {book.author}</p>
                <div className="mt-4">
                  <label className="block text-sepia">Note :</label>
                  <ReactStars
                    count={5}
                    value={book.rating || 0}
                    onChange={(newRating) => onUpdateRating(book._id || book.id, newRating)}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="mt-4 w-full">
                <h4 className="text-md font-semibold">Commentaires :</h4>
                <ul className="list-disc list-inside">
                  {book.comments.map((comment) => (
                    <li key={comment._id} className="text-gray-500 flex justify-between items-center">
                      {editingCommentId === comment._id ? (
                        <>
                          <input
                            type="text"
                            value={editCommentTexts[comment._id] || ""}
                            onChange={(e) => handleEditCommentChange(comment._id, e.target.value)}
                            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia"
                          />
                          <button
                            onClick={() => handleUpdateComment(book._id || book.id, comment._id)}
                            className="bg-teal text-parchment px-2 py-1 rounded ml-2 transition"
                          >
                            <FaSave />
                          </button>
                        </>
                      ) : (
                        <>
                          <span>{comment.text} - <em>{comment.name}</em></span>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleEditComment(book._id || book.id, comment._id, comment.text)}
                              className="bg-rust text-parchment px-2 py-1 rounded ml-2 transition"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => onDeleteComment(book._id || book.id, comment._id)}
                              className="bg-rust text-parchment px-2 py-1 rounded ml-2 transition"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={newCommentTexts[book._id || book.id] || ""}
                  onChange={(e) => handleNewCommentChange(book._id || book.id, e.target.value)}
                  placeholder="Ajouter un commentaire"
                  className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia mt-2"
                />
                <button
                  onClick={() => handleAddComment(book._id || book.id)}
                  className="mt-2 px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition"
                >
                  Ajouter
                </button>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-sepia">Aucun livre trouvé.</p>
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
      isForSale: PropTypes.bool,
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
  onUpdateComment: PropTypes.func.isRequired,
  onToggleForSale: PropTypes.func.isRequired,
};

export default BookList;