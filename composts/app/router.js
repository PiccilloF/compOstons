const { Router } = require('express');
const compostController = require('./controllers/compostController');
const userController = require('./controllers/userController');

const router = Router();


router
    .get('/', compostController.homePage)
    .get('/composts', compostController.getAllComposts)
    .get('/composts/:id(\\d+)', compostController.getOneCompost);


router
    .get('/users', userController.getAllUsers)
    .get('/users/:id(\\d+)', userController.getOneUser);


module.exports = router;