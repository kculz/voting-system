// Import User and Candidate models
const { User, Candidate } = require('../models');

// Define the vote controller
const vote = async (req, res) => {
  const { userId: id_number } = req.user;
  const { candidate_id } = req.params;
  try {
    const user = await User.findByPk(id_number);

    if (!user) {
      return res.json({
        success: false,
        msg: 'Not authenticated!',
      });
    }

    const candidate = await Candidate.findByPk(candidate_id, {
      include: [
        {
          model: User,
          as: 'cand',
          attributes: ['fullname', 'level', 'course'],
        },
      ],
    });

    if (!candidate) {
      // Return error if candidate not found
      return res.json({ success: false, msg: 'Candidate not found!' });
    }

    switch (candidate.position) {
      case 'President':
       
          user.votedForPres = true;
          await user.save();

          candidate.votes += 1;
          await candidate.save();

          
      default:
        console.log('default');
    }
  } catch (error) {
    console.log(error);
  }
};

// Export vote controller
module.exports.VOTECONTROLLER = { vote };
