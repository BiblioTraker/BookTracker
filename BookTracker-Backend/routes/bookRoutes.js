const express = require('express');
const Book = require('../models/Book'); // Importer le modèle Book
const router = express.Router();

// Route : Obtenir tous les livres
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    console.log("Livres trouvés dans la base de données :", books);
    res.status(200).json(books);
  } catch (err) {
    console.error("Erreur lors de la récupération des livres :", err);
    res.status(500).json({ error: err.message });
  }
});


// Route : Ajouter un nouveau livre
router.post('/', async (req, res) => {
  try {
    console.log('Requête reçue pour ajouter un livre :', req.body);
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Erreur lors de l\'ajout du livre :', err);
    res.status(400).json({ error: err.message });
  }
});

// Route : Supprimer un livre
router.delete('/:id', async (req, res) => {
  try {
    console.log('Tentative de suppression pour l\'ID :', req.params.id);
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
    res.status(500).json({ error: err.message });
  }
});


// Route : Mettre à jour un livre
router.put('/:id', async (req, res) => {
  try {
    const allowedUpdates = ["status"]; // Champs autorisés pour la mise à jour
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).json({ error: "Mise à jour invalide." });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ error: "Livre non trouvé." });
    }

    res.status(200).json(updatedBook);
    console.log("Mise à jour du statut pour l'ID :", req.params.id, "Données :", req.body);
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
