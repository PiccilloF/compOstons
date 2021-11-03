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
        
        const dataUpdated = {category, longitude, latitude};
        
        try {
            // function postgresql to update data
            await db.query(`SELECT update_compost($1,$2)`, [dataUpdated, id]);
            return ('user updated')
            

        } catch (err) {
            console.trace(err);
        }
    }

    static async allCompostJoinUser () {
        try {
            // function postgresql to update data - lighter code / making each row an instance of Compost;
           return (await db.query(`SELECT * FROM porposeur`)).rows.map(row => new this(row));
     
        } catch (err) {
            console.trace(err)
        }
    }
}

module.exports = Compost;

