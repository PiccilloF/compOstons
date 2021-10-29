const CoreModel = require ('./coreModel');


class Compost extends CoreModel  {

// define tableName for using it dynamically likje ${this.tableName}
static tableName = 'compost';

static async create(data) {
    const query = {
       text: `INSERT INTO compost (category, longitude, latitude) VALUES ([$1])`,
       values: [data.category, data.longitutde, data.latitude]
    }
};

    
}

module.exports = Compost;

