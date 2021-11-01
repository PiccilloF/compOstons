// we use database 
const db = require('../database');

// wedefine our core model 
class CoreModel {

    // for each "[model] extends CoreModel" we built an custom object whith this constructor (which is factorised)
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
    // ==========================================
    // we are building basics queries


    // fetch all with n arguments 
    static async fetch(...args) {
        const { rows } = await db.query(...args);

        if (rows.length === 0) {
            console.log("no data in your query ")
        }

        return rows;
    }

    static async fetchOne(...args) {
        // we want the first row of the fetch method's result
        return (await this.fetch(...args))[0];
    }

    static async findAll() {
        const data = await CoreModel.fetch(`SELECT * FROM ${this.tableName};`)
        return data.map(element => new this(element));
    }

    static async findOne(id) {
        console.log(this);
        const data = await CoreModel.fetchOne(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return new this(data);
    }

    

    static async delete(id) {
        const query = {
            text: `DELETE FROM ${this.tableName} WHERE id = $1`,
            values: [id]
        }
        try {
            // console.log('attention ça va delete')
            await db.query(query);


        } catch (err) {
            console.error(err)
        }

    }
}

module.exports = CoreModel;