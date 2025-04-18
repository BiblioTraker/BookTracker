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
import ResetPassword from "./pages/ResetPassword";
import PublicRoute from "./components/PublicRoute"; // Importer PublicRoute
import StatisticsPage from "./pages/StatisticsPage";


const App = () => {
  const location = useLocation();

  return (
    <BooksProvider>
    <AuthProvider>
      <div className="min-h-screen bg-parchment text-sepia">
        <Header />
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
                <PublicRoute>
                <PageTransition>
                  <Login />
                </PageTransition>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                <PageTransition>
                  <Register />
                </PageTransition>
                </PublicRoute>
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
            <Route 
            path="/reset-password/:token" 
            element={
                <ResetPassword />
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
            <Route
                path="/statistics"
                element={
                  <PrivateRoute>
                    <PageTransition>
                      <StatisticsPage />
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
