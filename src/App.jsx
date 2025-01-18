import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthProvider from './context/AuthContext';
import BooksProvider from './context/BookContext';
import PrivateRoute from './components/PrivateRoute';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'; // Importez le composant ForgotPassword

const App = () => {
  return (
    <BooksProvider>
      <AuthProvider>
        <div className="App">
          <AnimatePresence exitBeforeEnter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Ajoutez cette ligne */}
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