const CoreModel = require('./coreModel');
const db = require('../database');


class User extends CoreModel {

    // define tableName for using it dynamically likje ${this.tableName}
    static tableName = 'user_compost';

    static async create(data) {
        
        
        const query = {
            text: `INSERT INTO user_compost (firstname, lastname, username, mail, password, role, image)  VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            values: [data.firstname, data.lastname, data.username, data.mail, data.password, data.role, data.image]
        }
        try {
            console.log(query);
            await db.query(query);
            console.log('user is created')


        } catch (err) {
            console.error(err)
        }


    }
}

module.exports = User;

