import React from 'react';
import './StockList.css'; // Style will handle responsive switching

const StockList = ({ stocks }) => {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="no-stock-msg">
        <h2>stocklist</h2>
        <p>No stocks have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="stock-list">
      <h2>stocklist</h2>

      {/* Table View - Desktop */}
      <table className="desktop-view">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Profit / Loss</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => {
            const profitLoss = (stock.latestPrice - stock.purchasePrice) * stock.quantity;
            const isProfit = profitLoss >= 0;

            return (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>${Number(stock.purchasePrice).toFixed(2)}</td>
                <td>${Number(stock.latestPrice).toFixed(2)}</td>
                <td style={{ color: isProfit ? 'green' : 'red' }}>
                  {isProfit ? '+' : '-'}${Math.abs(profitLoss).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Card View - Mobile */}
      <div className="mobile-view">
        {stocks.map((stock, index) => {
          const profitLoss = (stock.latestPrice - stock.purchasePrice) * stock.quantity;
          const isProfit = profitLoss >= 0;

          return (
            <div className="stock-card" key={index}>
              <p><strong>Symbol:</strong> {stock.symbol}</p>
              <p><strong>Quantity:</strong> {stock.quantity}</p>
              <p><strong>Purchase Price:</strong> ${Number(stock.purchasePrice).toFixed(2)}</p>
              <p><strong>Current Price:</strong> ${Number(stock.latestPrice).toFixed(2)}</p>
              <p><strong>Profit / Loss:</strong> 
                <span style={{ color: isProfit ? 'green' : 'red' }}>
                  {isProfit ? ' +' : ' -'}${Math.abs(profitLoss).toFixed(2)}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockList;
