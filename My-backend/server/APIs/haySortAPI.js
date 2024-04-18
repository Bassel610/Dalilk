const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.get('/HaySort', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../JsonFolder/HaySort.json'));
        const HaySortContent = JSON.parse(data);
        res.json(HaySortContent);
    } catch (err) {
        console.error('Error reading HaySort section data:', err);
        res.status(500).json({ error: 'Failed to read HaySort section data' });
    }
});

module.exports = router;
