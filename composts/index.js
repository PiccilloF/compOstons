require('dotenv').config();
const express = require ('express');

const router = require('./app/router');

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Ready to compost on http://localhost:${PORT}`);
})