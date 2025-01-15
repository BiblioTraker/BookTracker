const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => console.error('MongoDB connection error:', err));

// Importer et utiliser les routes
app.use('/api/books', require('./routes/bookRoutes'));

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

const authRoutes = require("./routes/authRoutes");

// Middleware pour parser le JSON
app.use(express.json());

// Routes d'authentification
app.use("/api/auth", authRoutes);
