import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null); // Ajout d'un état pour le message
  const [messageType, setMessageType] = useState(""); // "success" ou "error"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez que l'email et la confirmation d'email correspondent
    if (email !== confirmEmail) {
      setMessage("Les emails ne correspondent pas.");
      setMessageType("error");
      return;
    }

    // Vérifiez que le mot de passe et la confirmation de mot de passe correspondent
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
        const errorData = await response.json(); // Récupérer l'erreur du backend
        setMessage(errorData.message || "Erreur lors de l'inscription.");
        setMessageType("error");
        return;
      }

      const data = await response.json(); // Traiter la réponse valide
      setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setMessageType("success");

      // Rediriger après un court délai
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
      setMessageType("error");
    }
  };

  const handleGoogleSuccess = async (response) => {
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

      // Rediriger après un court délai
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
      setMessageType("error");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Erreur de connexion Google :", error);
    setMessage("Erreur lors de la connexion avec Google. Veuillez réessayer.");
    setMessageType("error");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-parchment text-sepia">
        <div className="w-full max-w-md bg-parchment text-sepia rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-heading text-rust mb-6 text-center">
            Inscription
          </h2>

          {/* Affichage des messages */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                messageType === "success"
                  ? "bg-teal text-parchment"
                  : "bg-rust text-parchment"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-sepia"
              >
                Prénom
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sepia"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmEmail"
                className="block text-sm font-medium text-sepia"
              >
                Confirmer Email
              </label>
              <input
                type="email"
                id="confirmEmail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                autoComplete="off"
                className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-sepia"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
                  required
                />
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-sepia"
              >
                Confirmer Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
                  required
                />
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-rust text-parchment rounded-lg shadow hover:bg-teal focus:outline-none focus:ring-2 focus:ring-rust transition"
            >
              S'inscrire
            </button>
          </form>
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              buttonText="S'inscrire avec Google"
              className="w-full flex justify-center"
            />
          </div>
          <p className="mt-4 text-sm text-center text-sepia">
            Vous avez déjà un compte ?{" "}
            <a
              href="/login"
              className="text-rust hover:text-teal underline transition"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;