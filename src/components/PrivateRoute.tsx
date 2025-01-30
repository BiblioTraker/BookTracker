import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Définition du type pour les props
interface PrivateRouteProps {
  children: ReactNode;
}

// Définition du type de AuthContext
interface AuthContextType {
  user: { name: string; email: string } | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext) as AuthContextType;

  // Si l'utilisateur n'est pas connecté, rediriger vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, afficher le contenu protégé
  return children;
};

export default PrivateRoute;
