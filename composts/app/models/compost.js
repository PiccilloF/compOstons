const pool = require('../database');
const CoreModel = require('./coreModel');


class Compost extends CoreModel {

    // define tableName for using it dynamically likje ${this.tableName}
    static tableName = 'compost';

    static async create(data) {

        const query = {
            text: `INSERT INTO compost (category, longitude, latitude) VALUES ($1, $2, $3)`,
            values: [data.category, data.longitude, data.latitude]
        }
        try {
            const result = await pool.query(query);
           
        } catch (err) {
            console.error(err)
        }

    };


}

module.exports = Compost;

