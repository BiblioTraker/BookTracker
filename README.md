# BookTracker 📚

## Description
**BiblioTracker** est une application web interactive qui vous permet de suivre vos lectures, gérer vos livres, et enregistrer vos impressions. Avec une interface intuitive et des fonctionnalités avancées, BookTracker est l'outil idéal pour les amateurs de livres souhaitant organiser leur bibliothèque personnelle.

## Fonctionnalités principales 🚀

### Gestion des livres
- **Ajouter des livres** : 
  - Manuellement en renseignant le titre, l'auteur, et d'autres détails.
  - Automatiquement via l'API Google Books.
- **Organiser les livres** : 
  - Statuts : "Lu", "En cours", ou "À lire".

### Profil utilisateur
- Créez un compte ou connectez-vous pour accéder à vos données.
- Ajoutez un avatar et personnalisez votre profil.

### Recherche et filtres
- Recherchez des livres par titre ou auteur.
- Filtrez vos livres par statut, titre, auteur ou genre.

### Tableau de bord
- Vue d'ensemble des statistiques de lecture :
  - Nombre de livres dans chaque statut.
  - Graphiques interactifs pour visualiser vos habitudes de lecture.

## Technologie utilisée 🛠️

### Frontend
- **React.js**
- **React Router** : Navigation entre les pages.
- **Tailwind CSS** : Design moderne et responsive.
- **Framer Motion** : Animations fluides et interactives.

### Backend
- **Firebase** :
  - Authentication : Gestion des comptes utilisateurs.
  - Firestore : Base de données pour stocker les livres et profils utilisateurs.

### API
- **Google Books API** : Recherche et récupération des informations sur les livres.

## Installation 💻

### Prérequis
- Node.js et npm/yarn installés.
- Un compte Firebase avec les services Firestore et Authentication activés.

### Étapes
1. Clonez le projet :
   ```bash
   git clone https://github.com/your-username/booktracker.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd booktracker
   ```
3. Installez les dépendances :
   ```bash
   npm install
   # ou avec Yarn
   yarn install
   ```
4. Configurez Firebase :
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez les variables d'environnement Firebase :
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```
5. Lancez l'application en mode développement :
   ```bash
   npm start
   # ou avec Yarn
   yarn start
   ```
6. Accédez à l'application :
   - Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Contribution 🤝

Les contributions sont les bienvenues ! Voici comment contribuer :
1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
3. Faites vos modifications et commitez-les :
   ```bash
   git commit -m "Ajout de la fonctionnalité X"
   ```
4. Poussez les changements :
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```
5. Créez une Pull Request.

## Aperçu 🎥

### Page d'accueil
![BookTracker-12-31-2024_03_22_AM](https://github.com/user-attachments/assets/890b44df-9b73-4805-8f2b-9fb1a6ad474a)

### Page de gestion des livres
![BookTracker-12-31-2024_03_22_AM (1)](https://github.com/user-attachments/assets/cc304529-4033-4cf6-90d5-c2a0d6a09a71)

### Page d'ajout de livre
![BookTracker-12-31-2024_03_23_AM](https://github.com/user-attachments/assets/598005de-d923-491c-98db-a4bec298bb26))

---

**Suivez vos lectures et organisez votre bibliothèque avec BiblioTracker !** 📖✨

