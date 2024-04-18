const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.get('/CardSort', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../JsonFolder/CardSort.json'));
        const CardSortContent = JSON.parse(data);
        res.json(CardSortContent);
    } catch (err) {
        console.error('Error reading CardSort section data:', err);
        res.status(500).json({ error: 'Failed to read CardSort section data' });
    }
});


module.exports = router;
