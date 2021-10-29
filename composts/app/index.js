require('dotenv').config();
const express = require ('express');
const router = require('./router');
const app = express();
const cors = require ('cors')

app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 5000;


app.use(router);

app.listen(PORT, () => {
    console.log(`Ready to compost on ${PORT}`);
})