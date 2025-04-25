import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from 'framer-motion';

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
      { name: "À acheter", value: counts["À acheter"] },
    ];
  };

  const data = getStatusCounts();
  const COLORS = ['#5C1A1A', '#6B9E9F', '#A17F59', '#E1D0C0'];

  const handleClick = (data) => {
    onFilter(data.name);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-parchment text-sepia">
      <div className="relative p-6 bg-parchment text-sepia rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-heading text-rust mb-6 text-center">Mes statistiques</h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
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
          </motion.div>
          <div className="mt-4 text-center flex flex-col justify-center space-y-1 text-sepia font-body">
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