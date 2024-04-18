const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const app = express();

router.get('/CatigorySort', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../JsonFolder/CatigorySort.json'));
        const CatigorySortContent = JSON.parse(data);
        res.json(CatigorySortContent);
    } catch (err) {
        console.error('Error reading CatigorySort section data:', err);
        res.status(500).json({ error: 'Failed to read CatigorySort section data' });
    }
});

module.exports = router;
