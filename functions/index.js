const functions = require('firebase-functions');
const axios = require('axios');

exports.getAlphaVantageData = functions.https.onRequest(async (req, res) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).send('Missing symbol parameter');
  }

  try {
    const apiKey = functions.config().alphavantage.key;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).send('Error fetching data from Alpha Vantage');
  }
});
exports.getNewsAPIData = functions.https.onRequest(async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).send('Missing query parameter');
  }

  try {
    const apiKey = functions.config().newsapi.key;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).send('Error fetching data from News API');
  }
});
exports.getCoinGeckoData = functions.https.onRequest(async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send('Missing id parameter');
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).send('Error fetching data from CoinGecko');
  }
});
exports.getCoinMarketCapData = functions.https.onRequest(async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send('Missing id parameter');
  }

  try {
    const apiKey = functions.config().coinmarketcap.key;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`;

    const response = await axios.get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).send('Error fetching data from CoinMarketCap');
  }
});
exports.getCryptoCompareData = functions.https.onRequest(async (req, res) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).send('Missing symbol parameter');
  }

  try {
    const apiKey = functions.config().cryptocompare.key;
    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Apikey ${apiKey}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).send('Error fetching data from CryptoCompare');
  }
}); 