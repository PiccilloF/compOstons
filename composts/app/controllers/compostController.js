const Compost = require('../models/compost')

const compostController = {

    homePage: (_, res) => {
        res.send('Ready to compost !!')
    },


    getAllComposts: async (_, res) => {
        try {
            console.log('consolelog')
            const composts = await Compost.findAll();
            res.json(composts)

        } catch (err) {
            res.status(500).send(err);
        }
    },

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
            
            await Compost.create(req.body, req.params.id);
            res.send('ok');
            // voir pour redirect

        } catch (err) {
            res.status(500).send(err);
        }

    },

    deleteOneCompost: async (req, res) => {
        try {
            
            await Compost.delete(req.params.id)
            res.send('compost delete')
            

        } catch (err) {
            res.status(500).send(err);
        }

    },

    updateCompost: async (req, res) => {
        try {
            
            await Compost.update(req.body, req.params.id)


        } catch (err) {
            console.trace(err)
        }
    }


}


module.exports = compostController;