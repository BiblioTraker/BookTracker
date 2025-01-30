import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import AuthContext from "../context/AuthContext";

// Interface pour le contexte d'authentification
interface AuthContextType {
  login: (userData: any) => void;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const { login } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setMessage("Les emails ne correspondent pas.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Erreur lors de l'inscription.");
        setMessageType("error");
        return;
      }

      const data = await response.json();
      setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setMessageType("success");

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
      setMessageType("error");
    }
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      setMessage("Erreur lors de la connexion avec Google.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || "Erreur lors de la connexion avec Google.");
        setMessageType("error");
        return;
      }

      const data = await res.json();
      setMessage("Connexion réussie ! Redirection...");
      setMessageType("success");

      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
      setMessageType("error");
    }
  };

  const handleGoogleFailure = () => {
    setMessage("Erreur lors de la connexion avec Google. Veuillez réessayer.");
    setMessageType("error");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Inscription
          </h2>

          {message && messageType && (
            <div className={`mb-4 p-3 rounded ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom
              </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full p-2 border rounded-md" />
            </div>

            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full p-2 border rounded-md" />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmEmail">Confirmer Email</label>
              <input type="email" id="confirmEmail" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required className="mt-1 block w-full p-2 border rounded-md" />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password">Mot de passe</label>
              <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full p-2 border rounded-md" />
              <div className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-md mt-4">S'inscrire</button>
          </form>

          <div className="mt-4">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
          </div>

          <p className="mt-4 text-sm text-center">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">Se connecter</a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;