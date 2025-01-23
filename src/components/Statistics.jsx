// src/components/Statistics.jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FaRedo } from "react-icons/fa";

function Statistics({ books, onFilter }) {
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

  const handleClick = (data) => {
    onFilter(data.name);
  };

  const handleReset = () => {
    onFilter("Tous");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full max-w-4xl">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          title="Réinitialiser les filtres"
        >
          <FaRedo className="text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Mes statistiques</h2>
        <div className="flex">
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
              onClick={handleClick}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="mt-4 dark:text-white text-center flex flex-col justify-center">
            <p><strong>Total :</strong> {books.length} livres</p>
            {data.map((item) => (
              <p key={item.name}>
                <strong>{item.name} :</strong> {item.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;