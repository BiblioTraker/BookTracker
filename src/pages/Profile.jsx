import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AvatarEditor from "react-avatar-edit";


const Profile = () => {
  const user = auth.currentUser;
  const [profile, setProfile] = useState({
    displayName: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const handleCrop = (preview) => {
    setPreview(preview); // Met à jour l'aperçu avec l'image recadrée
  };
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileRef = doc(db, "users", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile(profileSnap.data());
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!preview) {
      setMessage("Veuillez sélectionner et recadrer une image.");
      return;
    }
    try {
      const profileRef = doc(db, "users", user.uid);
      await setDoc(profileRef, { ...profile, avatar: preview }, { merge: true });
      setMessage("Avatar mis à jour avec succès !");
      setProfile((prev) => ({ ...prev, avatar: preview })); // Mettre à jour localement
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const profileRef = doc(db, "users", user.uid);
      await setDoc(profileRef, profile, { merge: true });
      setMessage("Profil mis à jour !");
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 dark:text-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Mon Profil</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={profile.displayName}
          onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full dark:text-black"
        />
        <AvatarEditor
        width={250}
        height={250}
        onCrop={(preview) => setPreview(preview)} // Sauvegarde l'aperçu
        onClose={() => setPreview(null)}
      />
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Aperçu" className="rounded-full" />
        </div>
      )}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Sauvegarder
      </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default Profile;
