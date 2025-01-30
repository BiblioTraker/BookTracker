import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Définition du type pour les props
interface PublicRouteProps {
  children: ReactNode;
}

// Définition du type de AuthContext
interface AuthContextType {
  user: { name: string; email: string } | null;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext) as AuthContextType;

  // Si l'utilisateur est connecté, rediriger vers la page d'accueil
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher le contenu public
  return children;
};

export default PublicRoute;