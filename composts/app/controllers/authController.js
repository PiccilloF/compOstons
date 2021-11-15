const User = require('../models/user');
// const session = require("express-session"); usefull
const Compost = require('../models/compost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 6;


const authController = {

    register: async (req, res) => {

        try {
            // Check if all needed infos are send 
            // if(!req.body.username || !req.body.password || !req.body.role ) {
            //     res.status(500).send('tous les champs obligatoires doivent êtes complétés')
            // }

            // check if user already exists - if null return an error in console "no data in your query"
            const user = await User.find(req.body.mail);


            if (user.mail || user.username) {
                console.log('ok2')
                res.status(400).send("user already exists")
                return;
            }
            // check if password = password confirmation 
            // if (req.body.password !== req.body.confirmedPassword) {
            //     res.status(400).send("mot de passe et confirmation de mot de passe ne sont pas identiques");
            //     return;
            // }

            // change req.body.password with encrypted password
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);


            const newUser = await User.create(req.body);
            if (newUser) {
                console.log('ok4')
                // deleting password from user's object
                delete newUser.password;
                res.status(201).json(newUser)
            } else {
                res.status(400).send('error while registering newUser, check body values')
            }


        } catch (err) {
            console.trace(err)
            res.status(500).send(err);

        }
    },

    login: async (req, res) => {
        const mail = req.body.mail;

        if (!req.body.mail || !req.body.password) {
            return res.send("veuillez renseigner tous les champs")
        }

        try {
            const user = await User.find(mail);

            // compare clear password with encrypted password
            const clearPassword = await bcrypt.compare(req.body.password, user.password);

            if (!clearPassword) {
                res.status(400).send("erreur lors de la saisie du mot de passe ");
                return;
            }

            function generateAccessToken(user) {
                return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
            }

            let refreshTokens = [];

            function generateRefreshToken(user) {
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "20m" });
                refreshTokens.push(refreshToken);
                return refreshToken
            }

            const accessToken = generateAccessToken({ user: user.username });
            const refreshToken = generateRefreshToken({ user: user.username });

            const compost = await Compost.findUser(user.id);
            

            if (!compost.id) {
                console.log('pas de compost');
                delete user.password;
                res.json({ user: user, accessToken: accessToken, refreshToken: refreshToken });

            } else {
                console.log('y a compost')
                const compost = await Compost.findUser(user.id);
                delete user.paswword;
                res.status(201).json({ user: user, compost: compost,  accessToken: accessToken, refreshToken: refreshToken });
            }



        } catch (err) {

            console.log(err);
            res.status(400).send("erreur lors de la saisie de votre email et/ou mot de passe");
        }
    },





    logout: (req, res) => {
        // when logout, we suprress the user session
        req.session.destroy(err => {
            if (err) {
                res.status(400).send("Error while logout")
            } else {
                // req.headers.cookie = null;
                // req.session.login = null;
                res.send("User is now logout");
            }
        })
    },

    uploadImage: (req, res) => {
        try {
            console.log("file uploaded")
        } catch (error) {
            console.log(error)
        }

    }
};


module.exports = authController;