import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { motion } from 'framer-motion';

// Helper to get n random unique books
const getRandomItems = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export default function RecommendationSection() {
  const { books } = useBooks();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      if (books.length === 0) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const basisBooks = getRandomItems(books, 3);
        const authors = basisBooks.map(b => b.author);
        const query = authors.map(a => `inauthor:${encodeURIComponent(a)}`).join('+');
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=3`
        );
        const data = await res.json();
        let items = data.items || [];
        // If no results, fetch generic recommendations
        if (items.length === 0) {
          const fallbackRes = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=3`
          );
          const fallbackData = await fallbackRes.json();
          items = fallbackData.items || [];
        }
        const recs = items
          .filter(item => !books.some(b => (b._id || b.id) === item.id))
          .map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.[0] || 'Inconnu',
            cover: item.volumeInfo.imageLinks?.thumbnail,
          }))
          .slice(0, 3);
        setRecommendations(recs);
      } catch (e) {
        console.error('Erreur recommandations :', e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [books]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-heading text-rust mb-4 text-center">
        À découvrir pour vous
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {loading ? (
          <p className="text-sepia text-center col-span-full">
            Chargement des recommandations…
          </p>
        ) : recommendations.length > 0 ? (
          recommendations.map(book => (
            <div
              key={book.id}
              className="relative w-48 h-64 group"
            >
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={`Couverture de ${book.title}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                  Pas d'image
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-2 text-center">
                <h3 className="text-white text-lg font-semibold">{book.title}</h3>
                <p className="text-white text-sm">{book.author}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sepia text-center col-span-full">
            Aucune recommandation disponible.
          </p>
        )}
      </div>
    </motion.section>
  );
}