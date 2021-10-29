const Compost = require('../models/compost')

const compostController = {
    
    homePage: (_, res) => {
        res.send('Ready to compost !!')
    },
    
    
    getAllComposts: async (_, res) => {
        try {
            const composts = await Compost.findAll();
            res.json(composts)

        } catch (err) {
            res.status(404).send(err);
        }
    },

    getOneCompost: async (req,res) => {
        try {
            const compost = await Compost.findOne(req.params.id);
            res.json(compost)
        } catch (err) {
            res.status(404).send(err);
        }
    },

    createOneCompost: async (req, res) => {
        try {
            

        } catch (err) {
            res.status(404).send(err);
        }

    }


}


module.exports = compostController;