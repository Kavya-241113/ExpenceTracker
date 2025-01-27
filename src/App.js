import React from 'react';
import AddEntry from './components/AddEntry';
import EntryList from './components/Entry'; 
import Summary from './components/Summary';
import Chart from './components/Chat';


const App = () => {
  return (
    <div className="container">
      <h1 className="text-center my-4">Income & Expense Tracker</h1>
      <AddEntry/>
      <Summary />
      <Chart/>
      <EntryList/>
    </div>
  );
};

export default App;
