const db = require('../database');
const CoreModel = require('./coreModel');


class Compost extends CoreModel {

    // define tableName for using it dynamically likje ${this.tableName}
    static tableName = 'compost';

    static async create(data, id) {
        const query = {
            text: `INSERT INTO compost ("category", "longitude", "latitude", "user_id") VALUES ($1, $2, $3, $4);`,
            values: [data.category, data.longitude, data.latitude, id]
        }
        console.log(query)
        try {
            await db.query(query);

        } catch (err) {
            console.trace(err)
        }

    }

    static async update(data, id) {
        const oldCompost = await Compost.findOne(id);

        const category = data.category || oldCompost.category;
        const longitude = data.longitude || oldCompost.longitude;
        const latitude = data.latitude || oldCompost.latitude;

        const query = {
            text: `UPDATE compost SET category = $1, longitude = $2, latitude = $3 WHERE id = $4;`,
            values: [category, longitude, latitude, id]
        }
        console.log(query)

        try {
            await db.query(query);
            console.log('user is up to date')

        } catch (err) {
            console.trace(err)
        }

    }




}

module.exports = Compost;

