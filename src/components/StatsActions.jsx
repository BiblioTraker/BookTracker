// src/components/StatsActions.jsx
import React from 'react';
import { FaDownload, FaUndo } from 'react-icons/fa';

export default function StatsActions({ filteredBooks, onResetFilters }) {
  const handleExport = () => {
    const csv = [
      ['Titre', 'Auteur', 'Statut', 'Date'],
      ...filteredBooks.map(b => [b.title, b.author, b.status, b.addedAt]),
    ]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stats_books.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <button
        onClick={handleExport}
        className="flex items-center px-4 py-2 bg-rust text-parchment rounded shadow hover:bg-teal transition"
      >
        <FaDownload className="mr-2" /> Exporter CSV
      </button>
      <button
        onClick={onResetFilters}
        className="flex items-center px-4 py-2 bg-sepia text-parchment rounded shadow hover:bg-rust transition"
      >
        <FaUndo className="mr-2" /> Réinitialiser filtres
      </button>
    </div>
  );
}