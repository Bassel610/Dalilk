const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const app = express();

router.get('/ConservativeSort', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../JsonFolder/ConservativeSort.json'));
        const ConservativeSortContent = JSON.parse(data);
        res.json(ConservativeSortContent);
    } catch (err) {
        console.error('Error reading ConservativeSort section data:', err);
        res.status(500).json({ error: 'Failed to read ConservativeSort section data' });
    }
});

module.exports = router;
