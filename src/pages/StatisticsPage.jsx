import { useBooks } from "../context/BookContext";

const StatisticsPage = () => {
  const { books } = useBooks();

  return (
    <div className="p-4 bg-gray-100 text-gray-900">
    </div>
  );
};

export default StatisticsPage;