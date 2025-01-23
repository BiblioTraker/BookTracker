import { useBooks } from "../context/BookContext";

const StatisticsPage = () => {
  const { books } = useBooks();

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
    </div>
  );
};

export default StatisticsPage;