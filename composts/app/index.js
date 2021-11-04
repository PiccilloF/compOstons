require('dotenv').config();
const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors');

const session = require("express-session");

// allow all origin cors for now - to do : allow only specific ones
app.use(cors('*'));

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// creation of a session
app.use(session({

    secret: 'jecompostetonmotdepasse', //string used for signing session
    resave: true,//autosave at the end of the request
    saveUninitialized: true, // save all sessions - even empties
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

}));



const PORT = process.env.PORT || 5000;


app.use(router);

app.listen(PORT, () => {
    console.log(`Ready to compost on ${PORT}`);
});