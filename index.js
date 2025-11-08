const express = require('express');
const fetch = require('node-fetch');
const app = express();

// CORS FOR YOUR NETLIFY APP
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// YOUR INFINITYFREE LAYER 2
const LAYER2 = 'https://ice-cream-v2.free.nf/index.php';

app.get('*', async (req, res) => {
  try {
    const url = LAYER2 + req.originalUrl;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 14)',
        'Origin': 'https://preptrack-eddec.firebaseapp.com',
        'Referer': 'https://preptrack-eddec.firebaseapp.com/'
      }
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (e) {
    res.status(500).json({ error: 'proxy down' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('RENDER LAYER 1 LIVE'));
