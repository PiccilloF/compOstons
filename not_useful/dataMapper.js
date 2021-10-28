const db = require ('../composts/app/database');

const dataMapper = {
    getAllComposts: (callback) => {
        const query = 'SELECT * FROM user_compost;';
        db.query(query, callback);
    }
  

};

module.exports = dataMapper;