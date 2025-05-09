import { useBooks } from "../context/BookContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BookCard from '../components/BookCard';
import RecommendationSection from "../components/RecommendationSection";
import GoogleAd from '../components/GoogleAd';

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
      <div className="my-6 text-center">
        <GoogleAd
          adSlot="4637643185"
          className="mx-auto"
          style={{ display: 'block', margin: '0 auto' }}
          format="auto"
        />
      </div>
      {books.length > 0 && (
        <section className="mb-8">
          <RecommendationSection />
          <h2 className="text-2xl font-heading text-rust mb-4 text-center">Récemment ajoutés</h2>
          <Swiper slidesPerView={4.5} spaceBetween={8} className="mb-4">
            {books.slice(-10).reverse().map((book) => (
              <SwiperSlide key={book._id || book.id}>
                <BookCard
                  title={book.title}
                  author={book.author}
                  cover={book.cover || book.imageUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
      {books.length === 0 && (
        <div className="text-center mt-8">
          <Link to="/Register">
            <button className="mt-4 px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition">
            Inscrivez-vous et ajouter votre premier livre
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
