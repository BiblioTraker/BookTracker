import { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const clientId =
    "920576288088-bfu115t06ig1rv1cdmblk6kjkbcu6hcd.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const data = {
            credential: credentialResponse.credential,
            clientId: credentialResponse.clientId,
          };
          axios
            .post(`${import.meta.env.VITE_API_URL}/api/auth/google-auth`, data)
            .then((res) => {
              login(res.data);
              navigate("/");
            })
            .catch((err) => {
              console.error("Erreur réseau :", err);
              alert(
                "Impossible de se connecter au serveur. Veuillez réessayer plus tard."
              );
            });
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};
export default GoogleAuth;
