const db = require('../database');
const CoreModel = require('./coreModel');


class Compost extends CoreModel {

    // define tableName for using it dynamically like ${this.tableName}
    static tableName = 'compost';

    static async create(data, id) {
        const query = {
            text: `INSERT INTO compost ("category", "longitude", "latitude", "user_id") VALUES ($1, $2, $3, $4);`,
            values: [data.category, data.longitude, data.latitude, id]
        }
       
        try {
            await db.query(query);

        } catch (err) {
            console.trace(err);
        }

    }

    static async update(data, id) {
        
        const formerCompost = await Compost.findOne(id);
        
        // if a new data is sended, update variable else you let the old one.
        const category = data.category || formerCompost.category;
        const longitude = data.longitude || formerCompost.longitude;
        const latitude = data.latitude || formerCompost.latitude;

        const query = {
            text: `UPDATE compost SET category = $1, longitude = $2, latitude = $3 WHERE id = $4;`,
            values: [category, longitude, latitude, id]
        }
        
        try {
            await db.query(query);
            res.send('user updated');
            // need new user datas ??  

        } catch (err) {
            console.trace(err);
        }
    }

    static async allCompostJoinUser () {
        const query = {
            text: `SELECT compost.id, category, longitude, latitude, user_id, username FROM compost  JOIN user_compost ON compost.id = user_compost.id WHERE user_compost.role = 'proposeur';`
        }

        try {
           const data =  await db.query(query);
           return new this(data);
        } catch (err) {
            console.trace(err)
        }
    }
}

module.exports = Compost;

