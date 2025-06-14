import React, { useState } from 'react';
import './App.css';
import StockForm from './components/StockForm';
import StockList from './components/StockList';

function App() {
  const [stocks, setStocks] = useState([]);

  const addStock = (newStock) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  };

  return (
    <div className="app">
      <h1>my finance dashboard</h1>
      <StockForm onAddStock={addStock} />
      <StockList stocks={stocks} />
    </div>
  );
}

export default App;
