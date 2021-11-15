const db = require('../database');
const CoreModel = require('./coreModel');
// const User = require('./user');


class Compost extends CoreModel {

    // define tableName for using it dynamically like ${this.tableName}
    static tableName = 'compost';

    static async create(data, id) {
        const query = {
            text: `INSERT INTO compost ("category", "longitude", "latitude", "user_id") VALUES ($1, $2, $3, $4);`,
            values: [data.category, data.longitude, data.latitude, id]
        }

        try {
            const data =  await db.query(query);
            return new Compost(data);

        } catch (err) {
            console.trace(err);
        }

    }


    static async allCompostJoinUser() {
        try {
            // function postgresql to update data - lighter code / making each row an instance of Compost;
            return (await db.query(`SELECT * FROM porposeur`)).rows.map(row => new this(row));

        } catch (err) {
            console.trace(err)
        }
    }

    static async findUser(user_id) {
        try {
            
            const data = await CoreModel.fetchOne(`Select * FROM compost WHERE user_id = $1`, [user_id]);
            return new Compost(data);

        } catch (err) {
            console.trace(err)
        }

    }

    static async deleteCompost(user_id) {
        try {
            return await db.query(`DELETE FROM compost WHERE user_id = $1`, [user_id]);
            
            
            
        } catch (err) {
            console.trace(err)
        }
    }
};



module.exports = Compost;

