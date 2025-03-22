const express = require('express');
const cors = require('cors');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/search', (req, res) => {
  const query = req.query.q || '';
  sneaks.getProducts(query, 10, (err, products) => {
    if (err) return res.status(500).json({ error: 'Sneaks API failed' });
    res.json(products);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
