const CoreModel = require ('./coreModel');


class User extends CoreModel  {

// define tableName for using it dynamically likje ${this.tableName}
static tableName = 'user_compost';

    
}

module.exports = User;

