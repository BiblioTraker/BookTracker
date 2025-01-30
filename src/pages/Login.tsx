import { useState, useContext, FormEvent } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Interface pour AuthContext
interface AuthContextType {
  login: (userData: any) => void;
  allowPasswordPageAccess: () => void;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailAutoComplete, setEmailAutoComplete] = useState<string>("off");
  const [passwordAutoComplete, setPasswordAutoComplete] = useState<string>("off");
  
  const { login, allowPasswordPageAccess } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
    }
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      alert("Connexion Google échouée.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de se connecter via Google. Veuillez réessayer.");
    }
  };

  const handleGoogleFailure = () => {
    alert("Erreur lors de la connexion avec Google. Veuillez réessayer.");
  };

  const handleForgotPasswordClick = () => {
    allowPasswordPageAccess();
    navigate("/forgot-password");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Connexion
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailAutoComplete("on")}
                autoComplete={emailAutoComplete}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordAutoComplete("on")}
                  autoComplete={passwordAutoComplete}
                  className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-4">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
          </div>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <button onClick={handleForgotPasswordClick} className="text-indigo-500 hover:underline dark:text-indigo-400">
              Mot de passe oublié ?
            </button>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Vous n'avez pas de compte ?{" "}
            <a href="/register" className="text-indigo-500 hover:underline dark:text-indigo-400">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;