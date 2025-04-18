import { motion } from 'framer-motion';
import AvatarEditor from 'react-avatar-editor';

const AvatarModal = ({ isEditingAvatar, editorRef, image, handleFileChange, onCloseAvatar, saveAvatar, isUploading }) => {
  return (
    isEditingAvatar && (
      <div className="fixed inset-0 flex items-center justify-center bg-sepia/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-parchment text-sepia p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-heading text-rust mb-4">Modifier l'avatar</h2>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            scale={1.2}
            color={[255, 255, 255, 0.6]}
            rotate={0}
          />
          <div className="flex flex-col items-center justify-center mt-4">
            <label
              htmlFor="file-input"
              className="cursor-pointer px-4 py-2 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition"
            >
              Choisir un fichier
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onCloseAvatar}
              className="mr-2 px-4 py-2 bg-sepia text-parchment rounded-lg shadow hover:bg-teal transition"
            >
              Annuler
            </button>
            <button
              onClick={saveAvatar}
              className="px-4 py-2 bg-rust text-parchment rounded-lg shadow hover:bg-teal transition"
              disabled={isUploading}
            >
              {isUploading ? "Sauvegarde en cours..." : "Sauvegarder"}
            </button>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default AvatarModal;