const User = require('../models/user');
const session = require("express-session");




const authController = {

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

                console.log(req.session)
                console.log(req.headers.cookie)
                res.send('user logged')
                

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