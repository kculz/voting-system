const { USERCONTROLLER } = require("../controllers/userController");
const { AUTHMIDDLEWARE } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get('/', AUTHMIDDLEWARE.verifyAdmin, USERCONTROLLER.get);
router.post('/', USERCONTROLLER.addUser);
router.get('/admins', USERCONTROLLER.getAdmins);

module.exports.USERROUTE = router;
 

