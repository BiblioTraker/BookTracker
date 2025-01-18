import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Header from './components/Header';
import { AnimatePresence, motion } from "framer-motion";
import { BooksProvider } from "./context/BookContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login"; // Nouvelle page Login
import Register from "./pages/Register"; // Nouvelle page Register
import PrivateRoute from "./components/PrivateRoute"; // Importer PrivateRoute
import ForgotPassword from './pages/ForgotPassword';


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
    <BooksProvider>
    <AuthProvider>
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
            {/* Routes pour l'authentification */}
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />
            <Route 
            path="/forgot-password" 
            element={
              <PageTransition>
                <ForgotPassword />
              </PageTransition>
            }
            />
            {/* Routes protégées */}
            <Route
              path="/books"
              element={
                <PrivateRoute>
                  <PageTransition>
                    <Books />
                  </PageTransition>
                </PrivateRoute>
              }
            />
            <Route
              path="/add-book"
              element={
                <PrivateRoute>
                  <PageTransition>
                    <AddBook />
                  </PageTransition>
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      </AuthProvider>
    </BooksProvider>
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
