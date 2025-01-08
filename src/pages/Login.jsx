import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Connexion réussie !");
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="p-4 mt-8 max-w-md mx-auto bg-white dark:bg-gray-800 dark:text-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Se connecter</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connexion
        </button>
      </form>
      {message && (
        <p className={`mt-4 ${message.includes("Erreur") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
