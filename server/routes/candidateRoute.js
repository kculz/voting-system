const { CANDIDATECONTROLLER } = require('../controllers/candidateController');
const { uploadMiddleware } = require('../middlewares/fileUpload');

const router = require('express').Router();

router.post('/', uploadMiddleware, CANDIDATECONTROLLER.add);
router.get('/', CANDIDATECONTROLLER.get);
router.get('/pres', CANDIDATECONTROLLER.getPresCandidates);
router.get('/vp', CANDIDATECONTROLLER.getVpCandidates);
router.get('/en', CANDIDATECONTROLLER.getENCandidates);
router.get('/fm', CANDIDATECONTROLLER.getFMCandidates);

module.exports.CANDIDATESROUTE = router;
