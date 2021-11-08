require('dotenv').config();
const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors');
const session = require("express-session");
// const MemoryStore = require('memorystore')(session)





// gestion of CORS Policy // refacto
        // app.use((req, res, next) => {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.setHeader('Access-Control-Allow-Credentials', 'true');
        //     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        //     next();
        // });
app.use(cors({origin: '*'}))

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// creation of a session
app.use(session({
    name: 'sid',
    secret: 'jecompostetonmotdepasse', //string used for signing session
    resave: true,
    saveUninitialized: false, 
    // store: new MemoryStore({
    //     checkPeriod: 86400000 // prune expired entries every 24h
    //   }), 
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true
    }

}));



const PORT = process.env.PORT || 5000;


app.use(router);

app.listen(PORT, () => {
    console.log(`Ready to compost on ${PORT}`);
});