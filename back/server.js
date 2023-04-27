const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());

app.use(helmet());

app.get('/posts', async (req, res) => {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch('http://devtest1.infinityfreeapp.com/wp-json/wp/v2/posts');
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving posts');
  }
});

const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});