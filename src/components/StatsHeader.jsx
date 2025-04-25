export default function StatsHeader({ books }) {
  const total = books.length;
  const readCount = books.filter(b => b.status === 'Lu').length;
  const inProgressCount = books.filter(b => b.status === 'En cours').length;
  const toReadCount = books.filter(b => b.status === 'À lire').length;

  const stats = [
    { label: 'Total livres', value: total },
    { label: 'Lu', value: readCount },
    { label: 'En cours', value: inProgressCount },
    { label: 'À lire', value: toReadCount },
  ];

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-heading text-rust mb-6">Mes statistiques</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-parchment-light p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <p className="text-sm text-sepia-light">{stat.label}</p>
            <p className="text-2xl font-bold text-sepia">{stat.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
