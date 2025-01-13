const express = require('express');
const Book = require('../models/Book'); // Importer le modèle Book
const { protect } = require('../middleware/authMiddleware'); // Importer le middleware protect
const router = express.Router();

// Route : Obtenir tous les livres d'un utilisateur connecté
router.get('/', protect, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }); // Filtre par utilisateur
    console.log("Livres trouvés pour l'utilisateur :", req.user.id, books);
    res.status(200).json(books);
  } catch (err) {
    console.error("Erreur lors de la récupération des livres :", err);
    res.status(500).json({ error: err.message });
  }
});


// Route : Ajouter un nouveau livre
router.post('/', protect, async (req, res) => {
  try {
    console.log('Requête reçue pour ajouter un livre :', req.body);
    const newBook = new Book({
      ...req.body,
      user: req.user.id, // Associer le livre à l'utilisateur connecté
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Erreur lors de l\'ajout du livre :', err);
    res.status(400).json({ error: err.message });
  }
});

// Route : Supprimer un livre
router.delete('/:id', protect, async (req, res) => {
  try {
    console.log('Tentative de suppression pour l\'ID :', req.params.id);

    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) {
      console.log('Livre non trouvé ou accès interdit.');
      return res.status(404).json({ error: "Livre non trouvé ou accès interdit." });
    }

    // Utilisez deleteOne pour supprimer le document
    await book.deleteOne();
    console.log('Livre supprimé avec succès.');
    res.status(204).send();
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
    res.status(500).json({ error: err.message });
  }
});



// Route : Mettre à jour un livre
router.put('/:id', protect, async (req, res) => {
  try {
    const allowedUpdates = ["status"]; // Champs autorisés pour la mise à jour
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).json({ error: "Mise à jour invalide." });
    }

    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé ou accès interdit." });
    }

    // Appliquer les mises à jour
    updates.forEach((update) => (book[update] = req.body[update]));
    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
    console.log("Mise à jour du statut pour l'ID :", req.params.id, "Données :", req.body);
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
