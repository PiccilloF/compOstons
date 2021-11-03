const Compost = require('../models/compost');

const compostController = {

    homePage: (req, res) => {
        // homepage route, just checking if everything's fine
        res.send('Ready to compost !!');
    },

    // route to get all composts and owners' usernames - join on tables compost and user
    getCompostAndUsername: async (req, res) => {
        try {
            const composts = await Compost.allCompostJoinUser();
            res.json(composts.rows)
        } catch (err) {
            console.trace(err)
            res.status(500).send("erreur de récupérations des données")
        };
    },
    // getAllComposts: async (_, res) => {
    //     try {

    //         const composts = await Compost.findAll();
    //         res.json(composts)

    //     } catch (err) {
    //         res.status(500).send(err);
    //     }
    // },

    getOneCompost: async (req, res) => {
        try {
            const compost = await Compost.findOne(req.params.id);
            res.json(compost)
        } catch (err) {
            res.status(500).send(err);
        }
    },

    createOneCompost: async (req, res) => {
        try {
            const compost = await Compost.create(req.body, req.params.id);
            res.json(compost);
            // voir pour redirect

        } catch (err) {
            res.status(500).send(err);
        };
    },

    deleteOneCompost: async (req, res) => {
        try {
            await Compost.delete(req.params.id);
            res.send('compost delete');

        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateCompost: async (req, res) => {
        try {
            const compost = await Compost.update(req.body, req.params.id);
            res.json(compost);

        } catch (err) {
            console.trace(err);
        };
    }
};


module.exports = compostController;