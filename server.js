require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', async (req, res) => {
    const query = req.query.q || 'iphone unlock code';
    try {
        const response = await axios.get('https://www.google.com/search', {
            params: { q: query },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the search results:', error);
        res.status(500).send(`Error fetching the search results: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
