import { useBooks } from "../context/BookContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { books } = useBooks();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenue sur BiblioTracker</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Suivez vos lectures, visualisez vos progrès, et explorez vos livres préférés.
        </p>
      </header>
      {books.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-700 dark:text-gray-300">Ajoutez votre premier livre</p>
          <Link to="/add-book">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ajouter un Livre
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
