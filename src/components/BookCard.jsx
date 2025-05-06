export default function BookCard({ title, author, cover }) {
  return (
    <div className="relative w-60 h-80 mb-4 group">
      <img
        src={cover}
        alt={`Couverture de ${title}`}
        className="w-full h-full object-cover rounded-2xl"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-2 text-center">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-white text-sm">{author}</p>
      </div>
    </div>
  );
}