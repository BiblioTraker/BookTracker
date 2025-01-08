import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Header from './components/Header';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AnimatePresence, motion } from "framer-motion";
<<<<<<< HEAD
import { BooksProvider } from "./context/BookContext";
=======
import Profile from "./pages/Profile";
>>>>>>> main

const App = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Charger le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Sauvegarder le thème dans localStorage
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
<<<<<<< HEAD
    <BooksProvider>
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/books"
              element={
                <PageTransition>
                  <Books />
                </PageTransition>
              }
            />
            <Route
              path="/add-book"
              element={
                <PageTransition>
                  <AddBook />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </BooksProvider>
=======
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home books={books} />
              </PageTransition>
            }
            
          />
          <Route path="/sign-up" 
            element={
              <PageTransition>
              <SignUp />
              </PageTransition>
            } 
          />
          <Route path="/Login"
          element={
              <PageTransition>
              <Login />
              </PageTransition>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
              <PageTransition>
                <Books books={books} />
              </PageTransition>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <PrivateRoute>
              <PageTransition>
                <AddBook onAddBook={handleAddBook} />
              </PageTransition>
              </PrivateRoute>
            }
          />
            <Route
              path="/profile"
              element={
              <PrivateRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
              </PrivateRoute>
              }
          />
        </Routes>
      </AnimatePresence>
    </div>
>>>>>>> main
  );
};

// Composant pour les transitions
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default App;
