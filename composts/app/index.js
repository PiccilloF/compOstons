require('dotenv').config();
const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors');

// const redis = require('redis');
// const connectRedis = require('connect-redis');
// const session = require("express-session");
// const RedisStore = connectRedis(session);
// const redisClient = redis.createClient({
//     host : 'localhost',
//     port: 4000
// });
// redisClient.on('error', function (err) {
//     console.log('Could not establish a connection with redis. ' + err);
//     throw(err)
// });
// redisClient.on('connect', function (err) {
//     console.log('Connected to redis successfully');
// });


app.use(cors({ origin: '*' }))

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// // creation of a session
// app.use(session({
//     // store: new RedisStore({client: redisClient}),
//     secret: 'jecompostetonmotdepasse', //string used for signing session
//     resave: true,
//     saveUninitialized: false,

//     cookie: {
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         secure: true
//     }

// }));



const PORT = process.env.PORT || 5000;


app.use(router);

app.listen(PORT, () => {
    console.log(`Ready to compost on ${PORT}`);
});