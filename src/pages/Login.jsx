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
      <div className="flex items-center justify-center min-h-screen bg-parchment text-sepia">
        <div className="w-full max-w-md bg-parchment text-sepia rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-heading text-rust mb-6 text-center">
            Connexion
          </h2>
          <form onSubmit={handleSubmit}>
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
                onFocus={() => setEmailAutoComplete("on")}
                autoComplete={emailAutoComplete}
                className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
                required
              />
            </div>
            <div className="relative mb-4">
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
                  onFocus={() => setPasswordAutoComplete("on")}
                  autoComplete={passwordAutoComplete}
                  className="mt-1 block w-full px-4 py-2 border border-sepia rounded-md shadow-sm focus:ring-rust focus:border-rust bg-parchment text-sepia"
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
              className="w-full px-4 py-2 bg-rust text-parchment rounded-lg shadow hover:bg-teal focus:outline-none focus:ring-2 focus:ring-rust transition"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-4">
            <GoogleAuth />
          </div>
          <p className="mt-4 text-sm text-center text-sepia">
            <button
              onClick={handleForgotPasswordClick}
              className="text-rust hover:text-teal underline transition"
            >
              Mot de passe oublié ?
            </button>
          </p>
          <p className="mt-4 text-sm text-center text-sepia">
            Vous n'avez pas de compte ?{" "}
            <a
              href="/register"
              className="text-rust hover:text-teal underline transition"
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
