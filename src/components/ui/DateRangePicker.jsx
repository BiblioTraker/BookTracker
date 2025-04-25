export default function DateRangePicker({ from, to, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sepia">Du :</label>
      <input
        type="date"
        value={from ? from.toISOString().substr(0, 10) : ''}
        onChange={(e) => onChange({ from: e.target.valueAsDate, to })}
        className="border border-sepia p-2 rounded-md bg-parchment text-sepia"
      />
      <label className="text-sepia">Au :</label>
      <input
        type="date"
        value={to ? to.toISOString().substr(0, 10) : ''}
        onChange={(e) => onChange({ from, to: e.target.valueAsDate })}
        className="border border-sepia p-2 rounded-md bg-parchment text-sepia"
      />
    </div>
  );
}
