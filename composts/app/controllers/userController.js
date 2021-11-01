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
    },

    createOneUser: async (req, res) => {
        try {

            await User.create(req.body)
            res.send('ok')
            // voir pour redirect

        } catch (err) {
            res.status(404).send(err);
        }

    },

    deleteOneUSer: async (req, res) => {
        try {

            const data = await User.delete(req.params.id)
            res.send('user delete')


        } catch (err) {
            res.status(404).send(err);
        }

    },

    updateUser: async (req, res) => {
        try {
            console.log(req.body, req.params.id)
            await User.update(req.body, req.params.id)


        } catch (err) {
            res.status(500).send(err)
        }
    }

}


module.exports = userController;