const followerService = require('../services/followerService');

exports.followUser = async (req, res) => {
  try {
    const { followerID, followingID } = req.body;
    const result = await followerService.followUser(followerID, followingID);

    // Return the message based on the follow result
    return res.status(201).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { followerID, followingID } = req.body;
    const result = await followerService.unfollowUser(followerID, followingID);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const { userID } = req.params;
    const followers = await followerService.getFollowers(userID);
    return res.status(200).json(followers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const { userID } = req.params;
    const following = await followerService.getFollowing(userID);
    return res.status(200).json(following);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getSuggestedFollows = async (req, res) => {
  try {
    const { userID } = req.params;
    const suggestions = await followerService.getSuggestedFollows(userID);
    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.removeFollowing = async (req, res) => {
  try {
    const { followerID, followingID } = req.body;
    const result = await followerService.removeFollowing(followerID, followingID);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.removeFollower = async (req, res) => {
  try {
    const { followerID, followingID } = req.body;
    const result = await followerService.removeFollower(followerID, followingID);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.bulkFollow = async (req, res) => {
  try {
    const followerID = req.user.id;
    const followingIDs = req.body.followingIDs;

    if (!Array.isArray(followingIDs) || followingIDs.length === 0) {
      return res.status(400).json({ error: 'Expected a non-empty array of followingIDs.' });
    }

    const results = await followerService.bulkFollow(followerID, followingIDs);
    res.status(201).json({ success: true, followed: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.isFollowing = async (req, res) => {
  try {
    const followerID = req.user.id;
    const { userID } = req.params;
    const result = await followerService.isFollowing(followerID, userID);
    res.status(200).json({ isFollowing: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.isFollowedBy = async (req, res) => {
  try {
    const userID = req.user.id;
    const { otherID } = req.params;
    const result = await followerService.isFollowedBy(userID, otherID);
    res.status(200).json({ isFollowedBy: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
