import { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ResetPasswordParams extends Record<string, string | undefined> {
  token?: string;
  email?: string;
}

const ResetPassword: React.FC = () => {
  const { token, email } = useParams<ResetPasswordParams>(); // Récupération des paramètres de l'URL
  const navigate = useNavigate();

  // États pour gérer le formulaire
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  // Vérification de la validité du mot de passe
  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
  };

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifications avant envoi
    if (!password || !confirmPassword) {
      setMessage("Veuillez remplir tous les champs.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      setMessageType("error");
      return;
    }

    if (!isPasswordValid(password)) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.");
      setMessageType("error");
      return;
    }

    // Vérification du token et de l'email
    if (!token || !email) {
      setMessage("Lien de réinitialisation invalide ou expiré.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Échec de la réinitialisation du mot de passe.");
        setMessageType("error");
        return;
      }

      setMessage("Votre mot de passe a été réinitialisé avec succès !");
      setMessageType("success");

      // Redirection après 3 secondes
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Réinitialisation du mot de passe
        </h2>

        {message && messageType && (
          <div className={`mb-4 p-3 rounded ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nouveau mot de passe
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md"
            />
            <div className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmer le mot de passe
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md"
            />
            <div className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded-md mt-4">
            Réinitialiser le mot de passe
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Retourner à la page de{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            connexion
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;