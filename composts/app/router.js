const { Router } = require('express');
const compostController = require('./controllers/compostController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const router = Router();


router
    .get('/', compostController.homePage)    
    .get('/test', userController.findProposeur)
    .post('/login', authController.login)
    .delete('/logout', authController.logout)
    .get('/composts', compostController.getCompostAndUsername) 
    

router
    .route('/composts/:id(\\d+)')
    .get(compostController.getOneCompost)     
    .delete(compostController.deleteOneCompost)
   
router
    .get('/users', userController.getAllUsers)
    .post('/users', userController.createOneUser)
router
    .route('/users/:id(\\d+)')
    .get(userController.getOneUser)
    .post(compostController.createOneCompost)  
    .put(userController.updateUser)
    .delete(userController.deleteOneUSer)

router.put('/users/:id(\\d+)/update', compostController.updateCompost);


module.exports = router;