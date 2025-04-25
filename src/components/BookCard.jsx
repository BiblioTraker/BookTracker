export default function BookCard({ title, author, cover }) {
  return (
    <div className="w-60 h-80 bg-parchment text-sepia rounded-2xl shadow-lg overflow-hidden flex flex-col mb-4">
      <img
        src={cover}
        alt={`Couverture de ${title}`}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-2 flex-1 overflow-hidden">
        <h3 className="text-lg font-heading text-rust mb-1">{title}</h3>
        <p className="text-sm font-body">{author}</p>
      </div>
    </div>
  );
}