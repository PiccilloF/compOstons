const CoreModel = require ('./coreModel');


class Compost extends CoreModel  {

// define tableName for using it dynamically likje ${this.tableName}
static tableName = 'compost';

    
}

module.exports = Compost;

