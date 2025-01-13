import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si l'utilisateur n'est pas connecté, rediriger vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, afficher le contenu protégé
  return children;
};

export default PrivateRoute;
