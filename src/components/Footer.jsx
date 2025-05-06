// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-parchment py-8 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sepia">
        {/* Navigation */}
        <div>
          <h4 className="font-heading text-lg text-rust mb-2">Navigation</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-rust">Accueil</Link></li>
            <li><Link to="/books" className="hover:text-rust">Livres</Link></li>
            <li><Link to="/statistics" className="hover:text-rust">Statistiques</Link></li>
            <li><Link to="/add-book" className="hover:text-rust">Ajouter un livre</Link></li>
            <li><Link to="/legal" className="hover:text-rust">Mentions légales</Link></li>
            <li><Link to="/privacy" className="hover:text-rust">Politique de confidentialité</Link></li>
            <li><Link to="/contact" className="hover:text-rust">Contact</Link></li>
          </ul>
          <div className="mt-4">
            <a href="/cookie-settings" className="text-sm hover:text-rust">Paramètres des cookies</a>
          </div>
        </div>
        {/* Social Media */}
        <div className="flex flex-col items-center">
          <h4 className="font-heading text-lg text-rust mb-2">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-rust">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-rust">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-rust">
              <FaInstagram size={24} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-rust">
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-sm">&copy; {new Date().getFullYear()} BiblioTracker. Tous droits réservés.</p>
          <p className="text-xs mt-1">Conçu avec passion pour les amateurs de lecture.</p>
        </div>
      </div>
    </footer>
  );
}
