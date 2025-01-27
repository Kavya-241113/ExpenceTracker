import React, { useContext } from 'react';
import { TrackerContext } from '../context/TrackerContext';

const Summary = () => {
  const { state } = useContext(TrackerContext);

  const totalIncome = state.entries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpenses = state.entries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="mb-3">
      <h4>Summary</h4>
      <p>Total Income: ₹{totalIncome.toFixed(2)}</p>
      <p>Total Expenses: ₹{totalExpenses.toFixed(2)}</p>
      <p>Balance: ₹{balance.toFixed(2)}</p>
    </div>
  );
};

export default Summary;
