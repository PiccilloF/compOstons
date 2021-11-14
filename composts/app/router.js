const { Router } = require('express');
const compostController = require('./controllers/compostController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const mailController = require('./controllers/mailController');
const validateToken = require('./middlewares/validateToken');



const router = Router();



router
    .get('/', compostController.homePage)
    .post('/register', authController.register)
    .post('/login', authController.login)
    .get('/composts', compostController.getCompostAndUsername)



router
    .route('/composts/:id(\\d+)')
    .get(compostController.getOneCompost)
    .delete(compostController.deleteOneCompost);

router
.get('/users', userController.getAllUsers)
.post('/users', userController.createOneUser);
router
    .route('/users/:id(\\d+)')
    .get( userController.getOneUser)
    .post(compostController.createOneCompost)
    .put(userController.updateInfo)
    .delete(validateToken, userController.deleteOneUSer);

router.delete('/users/:id(\\d+)/logout', validateToken, authController.logout);
router.post('/users/:id(\\d+)/mail', validateToken, mailController.sendMail);



module.exports = router;