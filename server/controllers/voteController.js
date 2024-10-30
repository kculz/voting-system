// Import User and Candidate models
const { Op } = require('sequelize');
const { User, Candidate, sequelize } = require('../models');

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

      case 'Secretary General':
        if (!user.votedForFM) {
          user.votedForFM = true;
          voteSuccess = true;
          message = 'Voted for Secretary General successfully. You can vote for other candidates now!';
        } else {
          return res.json({ success: false, msg: 'You have already voted for Secretary General!' });
        }
        break;

      case 'Treasurer':
        if (!user.votedForEN) {
          user.votedForEN = true;
          voteSuccess = true;
          message = 'Voted for Treasurer successfully. You can vote for other candidates now!';
        } else {
          return res.json({ success: false, msg: 'You have already voted for Treasurer!' });
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


const getVotesByPositionAndParty = async (req, res) => {
  try {

    // Group votes by position and party
    const votesData = await Candidate.findAll({
      attributes: ['position', 'party', [sequelize.fn('SUM', sequelize.col('votes')), 'totalVotes']],
      group: ['position', 'party'],
    });

    // Get total number of students
    const totalStudents = await User.count();


    // Get total number of students who have voted in any position
    const totalVoted = await User.count({
      where: {
        [Op.or]: [
          { votedForPres: true },
          { votedForVP: true },
          { votedForFM: true },
          { votedForEN: true },
        ],
      },
    });


    // Format response for easier frontend usage
    const formattedData = votesData.reduce((acc, curr) => {
      const { position, party, totalVotes } = curr.get();
      if (!acc[position]) acc[position] = {};
      acc[position][party] = totalVotes;
      return acc;
    }, {});

    return res.json({
      success: true,
      data: formattedData,
      totalStudents,
      totalVoted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};

module.exports.VOTECONTROLLER = { vote, getVotesByPositionAndParty };
