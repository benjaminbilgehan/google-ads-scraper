const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3001;

const query = 'Cyprus Villas'; // Hardcoded search query

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://www.google.com/search', {
            params: {
                q: query
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        // Find ad URLs
        let adUrls = [];
        $('.uEierd a').each((index, element) => {
            const adUrl = $(element).attr('href');
            if (adUrl && adUrls.length === 0) { // Only take the first ad URL
                adUrls.push(adUrl);
            }
        });

        if (adUrls.length === 0) {
            return res.status(404).send('No ad URLs found');
        }

        const firstAdUrl = adUrls[0];
        res.send(`First Ad URL: <a href="${firstAdUrl}">${firstAdUrl}</a>`);
    } catch (error) {
        console.error('Error fetching the search results:', error.message);
        res.status(500).send('Error fetching the search results');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
