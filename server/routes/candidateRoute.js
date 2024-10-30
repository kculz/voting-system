const { CANDIDATECONTROLLER } = require('../controllers/candidateController');
const { AUTHMIDDLEWARE } = require('../middlewares/authMiddleware');
const { uploadMiddleware } = require('../middlewares/fileUpload');

const router = require('express').Router();

router.post('/', uploadMiddleware, AUTHMIDDLEWARE.verifyAdmin, CANDIDATECONTROLLER.add);
router.get('/', CANDIDATECONTROLLER.get);
router.get('/pres', CANDIDATECONTROLLER.getPresCandidates);
router.get('/vp', CANDIDATECONTROLLER.getVpCandidates);
router.get('/en', CANDIDATECONTROLLER.getTRCandidates);
router.get('/fm', CANDIDATECONTROLLER.getSGCandidates);
router.get('/winner', CANDIDATECONTROLLER.getWinners);

module.exports.CANDIDATESROUTE = router;
