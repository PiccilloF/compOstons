require('dotenv').config();
const express = require ('express');

const router = require('./router');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(router);

app.listen(PORT, () => {
    console.log(`Ready to compost on http://localhost:${PORT}`);
})