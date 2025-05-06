import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CATEGORIES = [
  { key: 'essential', label: 'Essentiels', required: true },
  { key: 'statistics', label: 'Statistiques' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'functional', label: 'Fonctionnels' },
];

export default function CookieSettings() {
  const [prefs, setPrefs] = useState({});

  useEffect(() => {
    const init = {};
    CATEGORIES.forEach(cat => {
      init[cat.key] = cat.required || Cookies.get(`cookie_${cat.key}`) === 'true';
    });
    setPrefs(init);
  }, []);

  const toggle = key => {
    const cat = CATEGORIES.find(c => c.key === key);
    if (cat.required) return;
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    Cookies.set(`cookie_${key}`, updated[key], { expires: 150 });
    // TODO: Charger/décharger Google Analytics, pixels, etc.
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-parchment rounded">
      <h2 className="text-2xl font-heading text-rust mb-4">Préférences de cookies</h2>
      {CATEGORIES.map(cat => (
        <label key={cat.key} className="block mb-2">
          <input
            type="checkbox"
            checked={prefs[cat.key] || false}
            disabled={cat.required}
            onChange={() => toggle(cat.key)}
            className="mr-2"
          />
          {cat.label} {cat.required && '(obligatoire)'}
        </label>
      ))}
    </div>
  );
}