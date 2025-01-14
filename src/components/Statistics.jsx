
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Statistics({ books }) {
  const getStatusCounts = () => {
    const counts = { Lu: 0, "En cours": 0, "À lire": 0 };
    books.forEach((book) => {
      counts[book.status] = (counts[book.status] || 0) + 1;
    });
    return [
      { name: "Lu", value: counts.Lu },
      { name: "En cours", value: counts["En cours"] },
      { name: "À lire", value: counts["À lire"] },
    ];
  };

  const data = getStatusCounts();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md flex justify-center dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
      <PieChart width={600} height={450}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <div className="mt-4 dark:text-white">
        <p><strong>Total :</strong> {books.length} livres</p>
        {data.map((item) => (
          <p key={item.name}>
            <strong>{item.name} :</strong> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
