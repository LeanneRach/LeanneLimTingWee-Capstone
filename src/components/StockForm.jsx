import React, { useState } from 'react';
import './StockForm.css';

const StockForm = ({ onAddStock }) => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear previous errors

    const apiKey = 'cc6a5dd8d1dc9c9dd3c40312';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const globalQuote = data['Global Quote'];

      if (!globalQuote || !globalQuote['05. price']) {
        throw new Error('Invalid stock symbol or API error.');
      }

      const latestPrice = parseFloat(globalQuote['05. price']);

      const stockData = {
        symbol: stockSymbol.toUpperCase(),
        quantity: parseInt(quantity),
        purchasePrice: parseFloat(purchasePrice),
        latestPrice,
      };

      console.log('📊 Stock added:', stockData);
      if (onAddStock) {
        onAddStock(stockData); // send to parent component if needed
      }

      // Clear form
      setStockSymbol('');
      setQuantity('');
      setPurchasePrice('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch stock data. Please check the symbol or try again later.');
    }
  };

  return (
    <form className="stock-form" onSubmit={handleSubmit}>
      <div>
        <label>Stock Symbol</label>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          placeholder="eg. AAPL"
          required
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Purchase Price</label>
        <input
          type="number"
          step="0.01"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Stock</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default StockForm;
