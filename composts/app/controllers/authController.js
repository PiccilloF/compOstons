const User = require('../models/user');
// const session = require("express-session"); usefull
const bcrypt = require('bcrypt');
const saltRounds = 6;


const authController = {

    register: async (req, res) => {

        try {
            // Check if all needed infos are send 
            if(!req.body.username || !req.body.password || !req.body.role ) {
                res.status(500).send('tous les champs obligatoires doivent êtes complétés')
            }

            // check if user already exists - if null return an error in console "no data in your query"
            const user = await User.find(req.body.mail);


            if (user.mail || user.username) {
                // console.log(user)
                res.status(400).send("user already exists")
                return;
            }
            // check if password = password confirmation 
            if (req.body.password !== req.body.confirmedPassword) {
                res.status(400).send("mot de passe et confirmation de mot de passe ne sont pas identiques");
                return;
            }

            req.body.password = await bcrypt.hash(req.body.password, saltRounds);

            const newUser = await User.create(req.body);
            if(newUser) {
                // deleting password from user's object
               delete newUser.password;
            res.status(201).json(newUser)
            } else {
                res.status(400).send('error while registreing newUser, check body values')
            }
            
           


        } catch (err) {
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
            delete user.password;
            res.send(user);

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
                req.headers.cookie = null;
                req.session.login = null;
                res.send("User is now logout");
            }
        })
    }
};


module.exports = authController;