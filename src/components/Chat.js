import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TrackerContext } from '../context/TrackerContext';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const { state } = useContext(TrackerContext);

  const groupedData = state.entries.reduce((acc, entry) => {
    const month = new Date(entry.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][entry.type] += entry.amount;
    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const incomeData = labels.map((month) => groupedData[month].income);
  const expenseData = labels.map((month) => groupedData[month].expense);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        data: incomeData,
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        data: expenseData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Expenses by Month',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
