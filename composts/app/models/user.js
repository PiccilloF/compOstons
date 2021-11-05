const CoreModel = require('./coreModel');
const db = require('../database');


class User extends CoreModel {

    // define tableName for using it dynamically likje ${this.tableName}
    static tableName = 'user_compost';

    static async create(data) {                
        try {
            // function postgres to create new user -  returning new user id
            const idNewUser = (await db.query(`SELECT create_user($1) AS id`, [data])).rows[0].id;
            // returning all datas from new user
            return await User.findOne(idNewUser);             
            
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
            const user = await db.query(`SELECT update_user($1, $2)`, [dataUpdated, id]);
            return new User(data);
            

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

