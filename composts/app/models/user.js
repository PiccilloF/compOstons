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

    static async update(data, id) {
        // we recover data in database
        const formerUser = await User.findOne(id);

        // if we have a new value we record it in the variable otherwise we let the actual data
        const firstname = data.firstname || formerUser.firstname;
        const lastname = data.lastname || formerUser.lastname;
        const username = data.username || formerUser.username;
        const mail = data.mail || formerUser.mail;
        const password = data.password || formerUser.password;
        const role = data.role || formerUser.role;
        const image = data.image || formerUser.image;

        const query = {
            text: `UPDATE user_compost SET firstname = $1, lastname = $2, username = $3, mail = $4, password = $5, role = $6, image = $7 WHERE id = $8;`,
            values: [firstname, lastname, username, mail, password, role, image, id]
        }

        console.log(query)


        try {
            await db.query(query);
            console.log('user is up to date')

        } catch (err) {
            console.trace(err)
        }
    }

    static async find(mail, res) {
      
        try {
           const user = await CoreModel.fetchOne(`Select * FROM user_compost WHERE mail = $1`, [mail]);
           

        } catch (err) {
            console.trace(err)
        }
        
        
    }

}

module.exports = User;

