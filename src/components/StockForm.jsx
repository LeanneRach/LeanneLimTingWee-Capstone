import React, { useState } from 'react';
import './StockForm.css'; // optional: for CSS styling

const StockForm = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data — you’ll integrate this later
    console.log('Stock Data:', { stockSymbol, quantity, purchasePrice });
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
          placeholder="eg. 10"
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
          placeholder="eg. 150.00"
          required
        />
        </div>
      <div>
           <button type="submit">Add Stock</button>
         </div>
    </form>
  );
};

export default StockForm;
