const User = require('../models/user');
const session = require("express-session");




const authController = {

    register: async (req, res) => {

        // check if password = password confirmation 
        if(req.body.password !== req.body.confirmedPassword) {
            res.status(400).send("mot de passe et confirmation de mot de passe ne sont pas identiques")
        } else {
            
            await User.create(req.body);
            res.status(201).send('utilisateur créé en base')
        }


    },

    login: async (req, res) => {
        const mail = req.body.mail;

        if (!req.body.mail || !req.body.password) {
            res.send("veuillez renseigner tous les champs")
        }

        try {
            const user = await User.find(mail);


            if (req.body.mail.toString() === user.mail.toString() && req.body.password === user.password) {

                req.session.login = {
                    username: user.username,
                    id: user.id,

                }
                res.send(req.session)


            } else {

                res.status(500).send('erreur de saisie login et/ou mail');
            }

        } catch (err) {
            console.log(err)
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