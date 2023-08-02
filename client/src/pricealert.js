// PriceAlertForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PriceAlertForm = () => {
  const [cryptoName, setCryptoName] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');

  const handleAlertSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/price-alert', { cryptoName, lowerLimit, upperLimit });
      console.log('Price alert saved:', response.data);
    } catch (error) {
      console.error('Failed to save price alert:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Set Price Alert</h2>
      <form onSubmit={handleAlertSubmit}>
        <div>
          <label htmlFor="cryptoName">Cryptocurrency:</label>
          <input type="text" id="cryptoName" value={cryptoName} onChange={(e) => setCryptoName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="lowerLimit">Lower Limit:</label>
          <input type="number" id="lowerLimit" value={lowerLimit} onChange={(e) => setLowerLimit(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="upperLimit">Upper Limit:</label>
          <input type="number" id="upperLimit" value={upperLimit} onChange={(e) => setUpperLimit(e.target.value)} required />
        </div>
        <button type="submit">Save Alert</button>
      </form>
    </div>
  );
};

export default PriceAlertForm;
