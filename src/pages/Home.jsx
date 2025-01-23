import { useBooks } from "../context/BookContext";

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
    </div>
  );
};

export default Home;
