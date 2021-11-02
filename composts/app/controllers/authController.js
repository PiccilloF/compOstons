const User = require('../models/user');
// const session = require("express-session"); usefull
const bcrypt = require('bcrypt');
const saltRounds = 6;




const authController = {

    register: async (req, res) => {

        try {

            // check if user already exists 
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

            // we check if database doesn't return error
            console.log(error)
            // if (newUser) {
            //     res.status(201).send('utilisateur créé en base');
            // } 
            // res.status(400).send("le mail n'est pas valide")

            
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
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

            req.session.login = {
                username: user.username,
                id: user.id,

            }
            res.send(req.session)



        } catch (err) {
            
            console.log(err);
            res.status(400).send("erreur lors de la saisie de votre email et/ou mot de passe")
        }



    },

    logout: (req, res) => {
        console.log(req.session.login)
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
}


module.exports = authController;