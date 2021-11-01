const User = require('../models/user')



const authController = {

    login: async (req, res) => {
        const mail = req.body.mail;

        if (!req.body.mail || !req.body.password) {
            res.send("veuillez renseigner tous les champs")
        }

        try {
            const user = await User.find(mail);
            console.log('req.body.mail', typeof(req.body.mail.toString()))
            console.log('user.mail',typeof(user.mail.toString()))
            console.log('req.body.password', typeof(req.body.password))
            console.log('user.password', typeof(user.password))
            
            if(req.body.mail.toString() === user.mail.toString() && req.body.password === user.password) {
               
                req.session.login = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                role: user.role,
                image: user.image
            };

            res.send(user)

        } else {
            
            res.send('erreur de saisie login et/ou mail')
        }

        } catch (err) {
            console.log(err)
        }

       
        
    }
}


module.exports = authController;