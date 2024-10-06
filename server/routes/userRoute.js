const { AUTHCONTROLLER } = require("../controllers/authController");
const { USERCONTROLLER } = require("../controllers/userController");
const { AUTHMIDDLEWARE } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post('/', USERCONTROLLER.addUser);

module.exports.USERROUTE = router;
 

