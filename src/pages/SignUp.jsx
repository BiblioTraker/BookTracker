import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Compte créé avec succès !");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("Cet email est déjà utilisé.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("L'email est invalide.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Le mot de passe est trop faible.");
      } else {
        setMessage(`Erreur : ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4 mt-8 max-w-md mx-auto bg-white dark:bg-gray-800 dark:text-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full dark:text-black"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full dark:text-black"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full dark:text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Créer un compte
        </button>
        <p className="text-center">
          Déjà un compte ? <a href="/login" className="hover:underline">Connectez-vous</a>
        </p>
      </form>
      {message && (
        <p className={`mt-4 ${message.includes("Erreur") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SignUp;
