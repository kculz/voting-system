


const vote = async (req, res) => {
  try {
    // Extract user ID and candidate ID from request
    const { userId: id_number } = req.user;
    const { candidate_id } = req.params;

    // Find user by ID
    const user = await User.findOne({ where: { id_number } });

    // Check if user exists
    if (!user) {
      // Return error if user not authenticated
      return res.json({ success: false, msg: 'Not authenticated!' });
    }

    // Find candidate by ID
    const candidate = await Candidate.findByPk(candidate_id);

    // Check if candidate exists
    if (!candidate) {
      // Return error if candidate not found
      return res.json({ success: false, msg: 'Candidate not found!' });
    }

    // Switch based on candidate position
    switch (candidate.position) {
      case 'President':
        // Check if user has already voted for President
        if (!user.votedForPres) {
          // Update user's vote status and increment candidate's votes
          user.votedForPres = true;
          candidate.votes += 1;
          // Save changes to user and candidate
          await candidate.save();
          await user.save();
          // Return success message
          return res.json({
            success: true,
            msg: 'Voted for President successfully. You can vote for other candidates now!',
          });
        } else {
          // Return error if user has already voted for President
          return res.json({
            success: false,
            msg: 'You have already voted for President!',
          });
        }
      case 'Vice President':
        // Check if user has already voted for Vice President
        if (!user.votedForVP) {
          // Update user's vote status and increment candidate's votes
          user.votedForVP = true;
          candidate.votes += 1;
          // Save changes to user and candidate
          await candidate.save();
          await user.save();
          // Return success message
          return res.json({
            success: true,
            msg: 'Voted for Vice President successfully. You can vote for other candidates now!',
          });
        } else {
          // Return error if user has already voted for Vice President
          return res.json({
            success: false,
            msg: 'You have already voted for Vice President!',
          });
        }
      case 'Finance Manager':
        // Check if user has already voted for Finance Manager
        if (!user.votedForFM) {
          // Update user's vote status and increment candidate's votes
          user.votedForFM = true;
          candidate.votes += 1;
          // Save changes to user and candidate
          await candidate.save();
          await user.save();
          // Return success message
          return res.json({
            success: true,
            msg: 'Voted for Finance Manager successfully. You can vote for other candidates now!',
          });
        } else {
          // Return error if user has already voted for Finance Manager
          return res.json({
            success: false,
            msg: 'You have already voted for Finance Manager!',
          });
        }
      case 'Entertainment':
        // Check if user has already voted for Entertainment
        if (!user.votedForEN) {
          // Update user's vote status and increment candidate's votes
          user.votedForEN = true;
          candidate.votes += 1;
          // Save changes to user and candidate
          await candidate.save();
          await user.save();
          // Return success message
          return res.json({
            success: true,
            msg: 'Voted for Entertainment successfully. You can vote for other candidates now!',
          });
        } else {
          // Return error if user has already voted for Entertainment
          return res.json({
            success: false,
            msg: 'You have already voted for Entertainment!',
          });
        }
      default:
        // Return error for invalid candidate position
        return res.json({
          success: false,
          msg: 'Invalid candidate position!',
        });
    }
  } catch (error) {
    // Return error for internal server error
    return res.json({
      success: false,
      msg: error.message,
      error: 'Internal server error!',
    });
  }
};