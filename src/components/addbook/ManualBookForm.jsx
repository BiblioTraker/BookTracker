// src/components/addbook/ManualBookForm.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FormProvider } from 'react-hook-form';

export default function ManualBookForm({
  methods,
  onSubmitManual,
  errors,
  coverPreview,
  handleDropCover,
  handleSelectCover
}) {
  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitManual)} className="space-y-4">
        {/* Titre */}
        <div>
          <label htmlFor="manual-title" className="block mb-1 text-sepia">
            Titre
          </label>
          <input
            id="manual-title"
            {...register('title')}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby="error-title"
            placeholder="Titre"
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rust"
          />
          <p id="error-title" className="text-red-500 text-sm">
            {errors.title?.message}
          </p>
        </div>

        {/* Register coverPreview as form value */}
        <input
          type="hidden"
          {...register('cover')}
          value={coverPreview || ''}
        />

        {/* Auteur */}
        <div>
          <label htmlFor="manual-author" className="block mb-1 text-sepia">
            Auteur
          </label>
          <input
            id="manual-author"
            {...register('author')}
            aria-invalid={errors.author ? "true" : "false"}
            aria-describedby="error-author"
            placeholder="Auteur"
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rust"
          />
          <p id="error-author" className="text-red-500 text-sm">
            {errors.author?.message}
          </p>
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="manual-genre" className="block mb-1 text-sepia">
            Genre
          </label>
          <input
            id="manual-genre"
            {...register('genre')}
            aria-invalid={errors.genre ? "true" : "false"}
            aria-describedby="error-genre"
            placeholder="Genre"
            className="border border-sepia p-2 rounded-md w-full bg-parchment text-sepia placeholder-sepia focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rust"
          />
          <p id="error-genre" className="text-red-500 text-sm">
            {errors.genre?.message}
          </p>
        </div>

        {/* Couverture (glisser-déposer ou fichier) */}
        <div>
          <label className="block mb-1 text-sepia">
            Couverture (glisser-déposez ou fichier)
          </label>
          <div
            onDrop={handleDropCover}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-sepia p-4 rounded-md flex flex-col items-center justify-center bg-parchment text-sepia cursor-pointer"
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Aperçu de la couverture"
                className="w-32 h-48 object-cover mb-2"
              />
            ) : (
              <p>Glissez-déposez une image ici</p>
            )}
            <input
              type="file"
              accept="image/*"
              id="manual-cover-file"
              className="hidden"
              onChange={handleSelectCover}
            />
            <label
              htmlFor="manual-cover-file"
              className="mt-2 text-teal underline cursor-pointer"
            >
              ou sélectionnez un fichier
            </label>
          </div>
        </div>

        {/* Bouton d’envoi */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-rust text-parchment rounded-lg shadow hover:bg-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rust transition"
          aria-label="Ajouter le livre manuellement"
        >
          Ajouter le Livre
        </motion.button>
      </form>
    </FormProvider>
  );
}