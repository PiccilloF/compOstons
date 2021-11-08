const User = require("../models/user");

const checkSession = {
    control: (req, res, next) => {
        // const user = await User.findOne 
        // console.log(req.params)
        console.log(req.session.auth);
        console.log(req.session.id);
        req.session.userid;
       
        console.log(req.session)

        if (req.session.auth && req.session.auth === req.session.id) {          
            console.log('bonjour');
            next();
        } else {
            res.status(401).send('user is not authentified, acces denied');
            return;
        }
    }
}

module.exports = checkSession;