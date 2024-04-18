const express = require('express');
const router = express.Router();
const fs = require('fs'); // Import fs module directly
const path = require('path');

router.get('/AllShops', async (req, res) => {
    try {
        const data = await fs.promises.readFile(path.join(__dirname, '../JsonFolder/AllShops.json'), 'utf-8');
        const AllShopsContent = JSON.parse(data);
        res.json(AllShopsContent);
    } catch (err) {
        console.error('Error reading AllShops section data:', err);
        res.status(500).json({ error: 'Failed to read AllShops section data' });
    }
});

router.post('/AllShops', async (req, res) => {
    try {
        const newShop = req.body;
        const filePath = path.join(__dirname, '../JsonFolder/AllShops.json');
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const shops = JSON.parse(data);
        newShop.id = shops.length + 1; // Generate a new ID (assuming IDs are sequential)
        shops.push(newShop);
        await fs.promises.writeFile(filePath, JSON.stringify(shops, null, 2));
        res.json({ message: 'Shop added successfully', shop: newShop });
    } catch (err) {
        console.error('Error updating AllShops section data:', err);
        res.status(500).json({ error: 'Failed to update AllShops section data' });
    }
});


let shops = JSON.parse(fs.readFileSync(path.join(__dirname, '../JsonFolder/AllShops.json'), 'utf-8'));

router.put('/editShop/:id', (req, res) => {
    const shopId = parseInt(req.params.id); 
    console.log(shopId, typeof shopId)
    const updatedData = req.body; // Data sent from client

    // Find the shop by ID
    const shopIndex = shops.findIndex(shop => shop.id === shopId); // Corrected findIndex() usage
    console.log(shopIndex)
    if (shopIndex !== -1) {
        console.log(shopIndex)
        // Update the shop data
        shops[shopIndex] = { ...shops[shopIndex], ...updatedData };
        // Update the JSON file with the new data
        fs.writeFile(path.join(__dirname, '../JsonFolder/AllShops.json'), JSON.stringify(shops, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).json({ message: 'Failed to update shop data' });
            } else {
                console.log('Shop data updated successfully');
                res.status(200).json({ message: 'Shop updated successfully' });
            }
        });
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});



router.delete('/deleteShops/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filePath = path.join(__dirname, '../JsonFolder/AllShops.json');
        let data = await fs.promises.readFile(filePath, 'utf-8');
        const shops = JSON.parse(data);
        const index = shops.findIndex(shop => shop.id === parseInt(id));
        if (index !== -1) {
            shops.splice(index, 1);
            await fs.promises.writeFile(filePath, JSON.stringify(shops, null, 2));
            res.json({ message: 'Shop deleted successfully' });
        } else {
            res.status(404).json({ error: 'Shop not found' });
        }
    } catch (err) {
        console.error('Error deleting shop:', err);
        res.status(500).json({ error: 'Failed to delete shop' });
    }
});

module.exports = router;
