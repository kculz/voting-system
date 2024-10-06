// Import User and Candidate models
const { User, Candidate } = require('../models');

const vote = async (req, res) => {
  try {
    // Extract user ID and candidate ID from request
    const { userId: id_number } = req.user;
    const { candidate_id } = req.params;

    // Find user by ID
    const user = await User.findOne({ where: { id_number } });

    // Check if user exists
    if (!user) {
      return res.json({ success: false, msg: 'Not authenticated!' });
    }

    // Find candidate by ID
    const candidate = await Candidate.findByPk(candidate_id);

    // Check if candidate exists
    if (!candidate) {
      return res.json({ success: false, msg: 'Candidate not found!' });
    }

    // Check voting status and update accordingly
    let voteSuccess = false;
    let message = '';

    switch (candidate.position) {
      case 'President':
        if (!user.votedForPres) {
          user.votedForPres = true;
          voteSuccess = true;
          message = 'Voted for President successfully. You can vote for other candidates now!';
        } else {
          return res.json({ success: false, msg: 'You have already voted for President!' });
        }
        break;

      case 'Vice President':
        if (!user.votedForVP) {
          user.votedForVP = true;
          voteSuccess = true;
          message = 'Voted for Vice President successfully. You can vote for other candidates now!';
        } else {
          return res.json({ success: false, msg: 'You have already voted for Vice President!' });
        }
        break;

      case 'Finance Manager':
        if (!user.votedForFM) {
          user.votedForFM = true;
          voteSuccess = true;
          message = 'Voted for Finance Manager successfully. You can vote for other candidates now!';
        } else {
          return res.json({ success: false, msg: 'You have already voted for Finance Manager!' });
        }
        break;

      case 'Entertainment':
        if (!user.votedForEN) {
          user.votedForEN = true;
          voteSuccess = true;
          message = 'Voted for Entertainment successfully. You can vote for other candidates now!';
        } else {
          return res.json({ success: false, msg: 'You have already voted for Entertainment!' });
        }
        break;

      default:
        return res.json({ success: false, msg: 'Invalid candidate position!' });
    }

    // Increment candidate's votes if voting was successful
    if (voteSuccess) {
      candidate.votes += 1;
      await candidate.save();
      await user.save();
      return res.json({ success: true, msg: message });
    }
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

// Export vote controller
module.exports.VOTECONTROLLER = { vote };
