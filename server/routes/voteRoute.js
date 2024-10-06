const { VOTECONTROLLER } = require('../controllers/voteController');
const { AUTHMIDDLEWARE } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post(`/:candidate_id`, AUTHMIDDLEWARE.verify, VOTECONTROLLER.vote);

module.exports.VOTESROUTE = router;
