import { useBooks } from "../context/BookContext";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Book } from "../types/types";  

// Interface pour les données du graphique
interface ChartData {
  name: string;
  value: number;
}

const StatisticsPage: React.FC = () => {
  const { books } = useBooks() as { books: Book[] };

  // Calculer les statistiques
  const getStatusCounts = (): ChartData[] => {
    const counts: Record<string, number> = {
      "À lire": 0,
      "En cours": 0,
      "Lu": 0,
      "À acheter": 0,
    };

    books.forEach((book) => {
      counts[book.status] = (counts[book.status] || 0) + 1;
    });

    return Object.keys(counts).map((status) => ({
      name: status,
      value: counts[status],
    }));
  };

  const data: ChartData[] = getStatusCounts();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Statistiques de Lecture</h2>

      {/* Graphique en Camembert */}
      <div className="flex flex-col lg:flex-row items-center justify-around">
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg font-semibold text-center mb-4">Répartition des Livres</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
          </ResponsiveContainer>
        </div>

        {/* Graphique en Barres */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg font-semibold text-center mb-4">Livres par Statut</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tableau Récapitulatif */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-center mb-4">Détails des Statistiques</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Statut</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Nombre de livres</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.name} className="text-center">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{entry.name}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-6 text-center">
        <p className="text-lg">
          <strong>Total de livres :</strong> {books.length}
        </p>
      </div>
    </div>
  );
};

export default StatisticsPage;