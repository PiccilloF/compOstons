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
           
            
            if(req.body.mail.toString() === user.mail.toString() && req.body.password === user.password) {

            req.session = {
                username: user.username,
                id: user.id,
                cookie: req.cookies
            }
            
            
            res.send(req.session);

        } else {
            
            res.status(500).send('erreur de saisie login et/ou mail');
        }

        } catch (err) {
            console.log(err)
        }

       
        
    }
}


module.exports = authController;