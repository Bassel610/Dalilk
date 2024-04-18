const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations
const path = require('path'); // Import path module
const conservativeRouter = require('./APIs/conservativeAPI');
const catigoryRouter = require('./APIs/catigoryAPI');
const allshopeRouter = require('./APIs/allShops');
const areaRouter = require('./APIs/areaAPI');
const cardsRouter = require('./APIs/cardAPI');
const hayRouter = require('./APIs/haySortAPI');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use(allshopeRouter);
app.use( areaRouter);
app.use(hayRouter);
app.use(conservativeRouter);
app.use(catigoryRouter);
app.use(cardsRouter);

// Define route to get the content of the AreaSort section


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
