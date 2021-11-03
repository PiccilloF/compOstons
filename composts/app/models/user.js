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
            
            const newUser = await db.query(query);
            return;


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

       const dataUpdated = {firstname, lastname, username, mail, password, role, image};

        try {
             // function postgresql to update data
            await db.query(`SELECT update_user($1, $2)`, [dataUpdated, id]);
            console.log('user is up to date')

        } catch (err) {
            console.trace(err)
        }
    }

    static async find(mail) {
      
        try {
           const data = await CoreModel.fetchOne(`Select * FROM user_compost WHERE mail = $1`, [mail]);
           return new User(data);
  

        } catch (err) {
            console.trace(err)
        }        
        
    }


    // static async findProposeur() {
        
    //     const data = await db.query(`select id from user_compost where role = 'proposeur';`)
    //     return new this(data)
    // }
}

module.exports = User;

