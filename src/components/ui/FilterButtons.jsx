const FILTERS = ['Tous', 'À lire', 'En cours', 'Lu', 'À acheter'];
const SORTS = ['Titre', 'Auteur'];

export default function FilterButtons({ currentFilter, onFilterChange, currentSort, onSortChange }) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              currentFilter === f
                ? 'bg-rust text-parchment shadow-md'
                : 'bg-parchment text-sepia hover:bg-sepia/80'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {SORTS.map((s) => (
          <button
            key={s}
            onClick={() => onSortChange(s)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              currentSort === s
                ? 'bg-rust text-parchment shadow-md'
                : 'bg-parchment text-sepia hover:bg-sepia/80'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </>
  );
}