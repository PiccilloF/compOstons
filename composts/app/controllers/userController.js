const User = require('../models/user')

const userController = {

    getAllUsers: async (_, res) => {
        try {
            const users = await User.findAll();
            for (let user of users) {
                delete user.password
            };
            res.json(users);

        } catch (err) {
            res.status(404).send(err);
        };
    },

    getOneUser: async (req, res) => {
        
        try {
            const user = await User.findOne(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(404).send(err);
        }
    },

    createOneUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
            // voir pour redirect
        } catch (err) {
            res.status(404).send(err);
        }
    },

    deleteOneUSer: async (req, res) => {
        try {
            const data = await User.delete(req.params.id);
            res.json(data);

        } catch (err) {
            res.status(404).send(err);
        };
    },

    updateInfo: async (req, res) => {
        try {
            await User.update(req.body, req.params.id);
            const user = await User.compostAndUserinfo(req.params.id);
            res.status(201).json(user);

        } catch (err) {
            res.status(500).send(err);
        }
    },

    // findProposeur: async (req, res) => {
    //     const data =await User.findProposeur();
    //     res.send(data);
    // }
};


module.exports = userController;