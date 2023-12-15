const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const productName = req.query.productName;
    const apiUrl = `https://nutrimonapi.azurewebsites.net/api/FoodItems/BySearch/${encodeURIComponent(productName)}`;
    const apiKey = '169546';

    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
                'X-API-Key': apiKey
            }
        });
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


app.get('/foodCompSpecs', async (req, res) => {
    
    const itemID = req.query.itemID;
    const sortKey = req.query.sortKey; // Now using a variable sortKey

    const apiUrl = `https://nutrimonapi.azurewebsites.net/api/FoodCompSpecs/ByItem/${itemID}/BySortKey/${sortKey}`;
    const apiKey = '169546';

    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
                'X-API-Key': apiKey
            }
        });
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});
