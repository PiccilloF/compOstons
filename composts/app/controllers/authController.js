const User = require('../models/user')



const authController = {
  

    login: async (req, res ) => {
        req.session.login = req.body.login;
        try {
            const user = await User.create(req.body);
            res.json(user)
        } catch (err) {
            res.status(404).send(err);
        }
        
        console.log("user logged")
    }
}

module.exports = authController;