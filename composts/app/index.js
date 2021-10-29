require('dotenv').config();
const express = require ('express');
const router = require('./router');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/', function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

const PORT = process.env.PORT || 5000;


app.use(router);

app.listen(PORT, () => {
    console.log(`Ready to compost on ${PORT}`);
})