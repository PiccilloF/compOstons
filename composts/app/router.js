const { Router } = require('express');
const compostController = require('./controllers/compostController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const router = Router();


router
    .get('/', compostController.homePage)
    
    .post('/login', authController.login)
    .get('/composts', compostController.getAllComposts) 
    

router
    .route('/composts/:id(\\d+)')
    .get(compostController.getOneCompost) 
    .post(compostController.createOneCompost)   
    .delete(compostController.deleteOneCompost)
   
router
    .get('/users', userController.getAllUsers)
    .post('/users', userController.createOneUser)
router
    .route('/users/:id(\\d+)')
    .get(userController.getOneUser)
    .put(userController.updateUser)
    .delete(userController.deleteOneUSer)

router.put('/users/:id(\\d+)/update', compostController.updateCompost);


module.exports = router;