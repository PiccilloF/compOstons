const CoreModel = require('./coreModel');
const db = require('../database');
const Compost = require('./compost');


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
        const formerCompost = await Compost.find(id)
        

        // if we have a new value we record it in the variable otherwise we let the actual data
        const firstname = data.firstname || formerUser.firstname;
        const lastname = data.lastname || formerUser.lastname;
        const username = data.username || formerUser.username;
        const mail = data.mail || formerUser.mail;
        const password = data.password || formerUser.password;
        const role = data.role || formerUser.role;
        const image = data.image || formerUser.image;
        const longitude = data.longitude || formerCompost.longitude;
        const latitude = data.latitude || formerCompost.latitude;
        const category = data.category || formerCompost.category;
        const address = data.address || formerCompost.address;

       const dataUpdated = {firstname, lastname, username, mail, password, role, image, longitude, latitude, category, address};

        try {
             // function postgresql to update data
            return await db.query(`SELECT update_info($1, $2)`, [dataUpdated, id]);
            
            

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

    static async compostAndUserinfo(id) {
        try {
            return (await db.query(`SELECT * FROM compost_and_userinfo WHERE id = $1`, [id])).rows[0];
        } catch (err) {
            console.trace(error)
        }
    }
    

    
}

module.exports = User;

