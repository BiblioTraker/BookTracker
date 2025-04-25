import React, { useState } from 'react';
import { useBooks } from "../context/BookContext";
import Statistics from "../components/Statistics";
import StatsHeader from '../components/StatsHeader';
import FilterButtons from '../components/ui/FilterButtons';

import DateRangePicker from '../components/ui/DateRangePicker';
import StatsActions from '../components/StatsActions';

const StatisticsPage = () => {
  const { books } = useBooks();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [filterStatus, setFilterStatus] = useState('Tous');

  const filteredBooks = books
    .filter(b => filterStatus === 'Tous' || b.status === filterStatus)
    .filter(b => {
      if (!dateRange.from || !dateRange.to) return true;
      const d = new Date(b.addedAt || b.createdAt || b.publishedDate);
      return d >= dateRange.from && d <= dateRange.to;
    });

  return (
    <div className="p-4 bg-parchment">
      <StatsHeader books={filteredBooks} />
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <FilterButtons
          currentFilter={filterStatus}
          onFilterChange={setFilterStatus}
        />
        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          onChange={setDateRange}
        />
      </div>
        <StatsActions
          filteredBooks={filteredBooks}
          onResetFilters={() => {
            setFilterStatus('Tous');
            setDateRange({ from: null, to: null });
          }}
        />
      <Statistics books={filteredBooks} onFilter={() => {}} />
    </div>
  );
};

export default StatisticsPage;