import React, { useState, useContext } from 'react';
import { TrackerContext } from '../context/TrackerContext';

const AddEntry = () => {
  const { dispatch } = useContext(TrackerContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ENTRY', payload: newEntry });
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          placeholder="Amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Entry</button>
    </form>
  );
};

export default AddEntry;
