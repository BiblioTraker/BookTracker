const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Vérifiez que le header contient un token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Récupérer le token
      token = req.headers.authorization.split(" ")[1];

      // Décoder le token pour récupérer l'ID utilisateur
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter l'utilisateur à la requête (sans le mot de passe)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      res.status(401).json({ message: "Non autorisé" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Non autorisé, aucun token fourni" });
  }
};

module.exports = { protect };
