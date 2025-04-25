export default function AddBookTabs({ tab, setTab }) {
  return (
    <div className="mb-6 flex border-b" role="tablist">
      {['search', 'manual'].map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-4 py-2 -mb-px font-medium ${
            tab === t ? 'border-b-2 border-rust text-rust' : 'text-sepia/70 hover:text-sepia'
          }`}
          aria-selected={tab === t}
          role="tab"
        >
          {t === 'search' ? 'Recherche' : 'Saisie manuelle'}
        </button>
      ))}
    </div>
  );
}