const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.get('/AreaSort', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../JsonFolder/AreaSort.json'));
        const AreaSortContent = JSON.parse(data);
        res.json(AreaSortContent);
    } catch (err) {
        console.error('Error reading AreaSort section data:', err);
        res.status(500).json({ error: 'Failed to read AreaSort section data' });
    }
});
module.exports = router;
