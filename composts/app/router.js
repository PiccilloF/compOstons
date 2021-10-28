const { Router } = require('express');
const compostController = require('./controllers/compostController');
const userController = require('./controllers/userController');

const router = Router();


router
    .get('/api', compostController.homePage)
    .get('/api/composts', compostController.getAllComposts)
    .get('/api/composts/:id(//d+)', compostController.getOneCompost);


router
    .get('/api/users', userController.getAllUsers)
    .get('/api/users/:id(//d+)', userController.getOneUser);


module.exports = router;