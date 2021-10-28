const User = require('../models/user')

const userController = {

    getAllUsers: async (_, res) => {
        try {
            const users = await User.findAll();
            res.json(users)

        } catch (err) {
            res.status(404).send(err);
        }
    },

    getOneUser: async (req, res) => {
        try {
            const user = await User.findOne(req.params.id);
            res.json(user)
        } catch (err) {
            res.status(404).send(err);
        }
    }
}


module.exports = userController;