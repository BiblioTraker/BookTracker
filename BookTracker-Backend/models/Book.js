const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  cover: { type: String },
  status: {
    type: String,
    enum: ['À lire', 'En cours', 'Lu'], // Limite les valeurs acceptées
    default: 'À lire',
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Lien avec l'utilisateur
});

module.exports = mongoose.model('Book', bookSchema);

