const { Router } = require('express');
const compostController = require('./controllers/compostController');
const userController = require('./controllers/userController');
const authController  = require('./controllers/authController');
const mailController  = require('./controllers/mailController');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(error, './public/images')
//     },
//     filename: (req, file, callback) => {
//         callback(error, 'test' + path.extname(file.originalname) )
//     }

// })
// const upload = multer({storage : storage});


const router = Router();



router
    .get('/', compostController.homePage)
    // .get('/test', userController.findProposeur)
    .post('/register',authController.register)
    .post('/login', authController.login)
    .delete('/logout', authController.logout)
    .get('/composts', compostController.getCompostAndUsername)
    // .post('/test', upload.single('image'), authController.uploadImage);


router
    .route('/composts/:id(\\d+)')
    .get(compostController.getOneCompost)
    .delete(compostController.deleteOneCompost);

router
    .get('/users', userController.getAllUsers)
    // .post('/users', userController.createOneUser);
router
    .route('/users/:id(\\d+)')
    .get(userController.getOneUser)
    .post(compostController.createOneCompost)    
    .put(userController.updateInfo)
    .delete(userController.deleteOneUSer);

router.delete('/users/:id(\\d+)/logout', authController.logout);
router.post('/users/:id(\\d+)/mail', mailController.sendMail);
// router.put('/users/:id(\\d+)/update', compostController.updateCompost);


module.exports = router;