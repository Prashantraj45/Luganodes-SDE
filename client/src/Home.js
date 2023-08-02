// CryptoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd'
            },
          }
        );
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCryptos();
  }, []);
  const handleFavoriteClick = (cryptoId) => {
    axios.post('/api/addcrypto', )
      .then((response) => {
        console.log('Cryptocurrency added to watchlist:', response.data);
      })
      .catch((error) => {
        console.error('Error adding cryptocurrency to watchlist:', error);
      });
  };

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <button
                  className="crypto-button"
                  onClick={() => {
                    // Handle button click here (e.g., open details, link to page, etc.)
                    console.log(`${crypto.name} button clicked!`);
                  }}
                >
                  {crypto.name}
                </button>
              </td>
              <td>${crypto.current_price}</td>
              <td>
                <button
                  className={`favorite-button ${crypto.favorite ? 'active' : ''}`}
                  onClick={() => handleFavoriteClick(crypto.id)}
                >
                  <span role="img" aria-label="Favorite">
                    ❤️
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;