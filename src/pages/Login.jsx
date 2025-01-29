import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleAuth from "../components/Login/GoogleAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailAutoComplete, setEmailAutoComplete] = useState("off");
  const [passwordAutoComplete, setPasswordAutoComplete] = useState("off");
  const { login, allowPasswordPageAccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      login(data);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  const handleForgotPasswordClick = () => {
    allowPasswordPageAccess();
    navigate("/forgot-password");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Connexion
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailAutoComplete("on")}
                autoComplete={emailAutoComplete}
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
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
                  className="block w-full px-4 py-2 pl-10 mt-1 border border-gray-300 rounded-md shadow-sm dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300"
                  required
                />
                <div
                  className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-4">
            <GoogleAuth />
          </div>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <button
              onClick={handleForgotPasswordClick}
              className="text-indigo-500 hover:underline dark:text-indigo-400"
            >
              Mot de passe oublié ?
            </button>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Vous n&apos;avez pas de compte ?{" "}
            <a
              href="/register"
              className="text-indigo-500 hover:underline dark:text-indigo-400"
            >
              S&apos;inscrire
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
