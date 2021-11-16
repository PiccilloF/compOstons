const Compost = require('../models/compost');
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
            await User.delete(req.params.id);
            await Compost.deleteCompost(req.params.id);
            res.status(200).send("uzer and compost deleted")

        } catch (err) {
            res.status(404).send(err);
        };
    },

    updateInfo: async (req, res) => {
        try {


            const user = await User.update(req.body, req.params.id);
            
            const compost = await Compost.findUser(req.params.id);


            if (!compost.id) {
                console.log('pas de compost');
                const compost = await Compost.create(req.body, req.params.id);
                const user = await User.findOne(req.params.id);
                delete user.password;
                res.status(201).json({user:user, compost:compost});
            } else {
                console.log('y a compost')
                const user = await User.findOne(req.params.id);
                delete user.password;
                const compost = await Compost.findUser(req.params.id);
                res.status(201).json({user : user, compost: compost});
            }
        } catch (err) {
            console.trace(err)
            res.status(500).send(err);
        }
    },


};


module.exports = userController;