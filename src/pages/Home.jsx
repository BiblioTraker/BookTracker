import { useBooks } from "../context/BookContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { books } = useBooks();

  return (
    <div className="min-h-screen p-6 bg-parchment text-sepia">
      <header className="mt-14 text-center mb-8">
        <h1 className="text-5xl font-heading mb-4 text-rust">Bienvenue sur BiblioTracker</h1>
        <p className="text-lg font-body text-sepia mb-6">
          Suivez vos lectures, visualisez vos progrès, et explorez vos livres préférés.
        </p>
      </header>
      {books.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-xl font-heading text-rust mb-4">Ajoutez votre premier livre</p>
          <Link to="/add-book">
            <button className="mt-4 px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition">
              Ajouter un Livre
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
