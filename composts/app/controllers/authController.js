const User = require('../models/user')



const authController = {

    login: async (req, res) => {


        const mail = req.body.mail;


        if (!req.body.mail || !req.body.password) {
            res.send("veuillez renseigner tous les champs")
        }

        try {
            const user = await User.find(mail);
            console.log(user)
            if(req.body.mail.toString() === user.mail.toString() && req.body.password === user.mail) {
            req.session.login = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                role: user.role,
                image: user.image
            };

            res.send("user logged")

        } else {
            res.send('erreur de saisie login et/ou mail')
        }

        } catch (err) {
            console.log(err)
        }

       
        
    }
}


module.exports = authController;