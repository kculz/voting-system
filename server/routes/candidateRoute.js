const { CANDIDATECONTROLLER } = require('../controllers/candidateController');
const { uploadMiddleware } = require('../middlewares/fileUpload');

const router = require('express').Router();

router.post('/', uploadMiddleware, CANDIDATECONTROLLER.add);
router.get('/', CANDIDATECONTROLLER.get);

module.exports.CANDIDATESROUTE = router;
