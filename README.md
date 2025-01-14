# BookTracker 📚

## Description
**BiblioTracker** est une application web interactive qui permet de suivre vos lectures, gérer vos livres et visualiser vos progrès de lecture. Avec son interface intuitive et ses fonctionnalités avancées, BiblioTracker est l'outil idéal pour organiser votre bibliothèque personnelle.

## Fonctionnalités principales 🚀

### Gestion des livres
- **Ajouter des livres** :
  - Manuellement en renseignant le titre, l'auteur, et d'autres détails.
  - Automatiquement via l'API Google Books.
- **Statuts personnalisables** :
  - "Lu", "En cours", ou "À lire".
- **Rechercher des livres** :
  - Recherche locale par titre ou auteur.
  - Recherche avancée avec l'API Google Books.

### Profil utilisateur
- Création de compte et connexion sécurisée.
- Gestion individuelle des bibliothèques selon les utilisateurs connectés.

### Tableau de bord et statistiques
- **Vue d'ensemble des habitudes de lecture** :
  - Nombre total de livres par statut.
  - Diagramme circulaire interactif pour visualiser les données.
- Mise à jour en temps réel des statistiques après chaque ajout ou suppression.

### Expérience utilisateur
- Mode sombre/clair configurable.
- Design responsive, compatible avec les mobiles (375x744) et tablettes (768x744).

## Technologie utilisée 🛠️

### Frontend
- **React.js** : Interface utilisateur dynamique et moderne.
- **React Router** : Gestion de la navigation.
- **Tailwind CSS** : Style responsive et adaptable.
- **Framer Motion** : Animations interactives.

### Backend
- **Node.js avec Express** : API REST pour gérer les utilisateurs et les livres.
- **MongoDB avec Mongoose** : Stockage des livres et des profils utilisateurs.
- **JWT (JSON Web Token)** : Authentification sécurisée.

### API
- **Google Books API** : Recherche avancée pour enrichir les données des livres.

## Installation 💻

### Prérequis
- Node.js et npm/yarn installés.
- MongoDB configuré et en cours d'exécution.

### Étapes
1. Clonez le projet :
   ```bash
   git clone https://github.com/ValH-code/BookTracker.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd BookTracker
   ```
3. Installez les dépendances pour le frontend et le backend :
   ```bash
   cd frontend
   yarn install
   cd ../backend
   yarn install
   ```
4. Configurez les variables d'environnement :
   - Créez un fichier `.env` dans le dossier `backend` et ajoutez les informations suivantes :
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     GOOGLE_BOOKS_API_KEY=your_google_books_api_key
     ```
5. Lancez le backend :
   ```bash
   cd backend
   yarn start
   ```
6. Lancez le frontend :
   ```bash
   cd frontend
   yarn start
   ```
7. Accédez à l'application :
   - Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Contribution 🤝

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :
1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
3. Apportez vos modifications et commitez-les :
   ```bash
   git commit -m "Ajout de la fonctionnalité X"
   ```
4. Poussez vos changements :
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```
5. Créez une Pull Request.

## Aperçu 🎥

### Page d'accueil
![Page d'accueil](https://github.com/user-attachments/assets/0ab2fda2-dbd6-4cab-b1ec-f35a72ae749a)


### Page de gestion des livres
![Page des livres](https://github.com/user-attachments/assets/f4d0118a-aed4-4a42-bc95-a84344069f9e)


### Recherche de livre
![Recherche](https://github.com/user-attachments/assets/2dadabdf-9227-4d72-91fe-f2dc8b7688ac)


---

**Organisez votre bibliothèque et suivez vos lectures avec BiblioTracker !** 📖✨



