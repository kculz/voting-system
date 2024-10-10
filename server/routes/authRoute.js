const { AUTHCONTROLLER } = require('../controllers/authController');
const { USERCONTROLLER } = require('../controllers/userController');

const router = require('express').Router();

router.post('/login', AUTHCONTROLLER.login);
router.post('/logout', AUTHCONTROLLER.logout);
router.post('/login/admin', AUTHCONTROLLER.adminLogin);
router.post('/register/admin', AUTHCONTROLLER.registerAdmin);

module.exports.AUTHROUTE = router;