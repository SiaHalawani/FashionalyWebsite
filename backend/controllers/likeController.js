const likeService = require('../services/likeService');

exports.like = async (req, res) => {
  try {
    const result = await likeService.likePost({
      postID: req.body.postID,
      userID: req.user.id
    });
    res.status(200).json({ liked: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlike = async (req, res) => {
  try {
    await likeService.unlikePost({
      postID: req.params.postID,
      userID: req.user.id
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.count = async (req, res) => {
  try {
    const count = await likeService.countLikes(req.params.postID);
    res.status(200).json({ postID: req.params.postID, likes: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkLike = async (req, res) => {
  try {
    const userID = req.user.id;
    const postIDs = req.body.postIDs;

    if (!Array.isArray(postIDs) || postIDs.length === 0) {
      return res.status(400).json({ error: 'postIDs must be a non-empty array.' });
    }

    const result = await likeService.bulkLikePosts(userID, postIDs);
    res.status(201).json({ success: true, liked: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all postIDs liked by the current user
exports.getMyLikes = async (req, res) => {
  try {
    const likes = await likeService.getUserLikes(req.user.id);
    const likedPostIDs = likes.map(l => l.postID);
    res.status(200).json({ likedPostIDs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users who liked a specific post, ordered by most recent
exports.getPostLikers = async (req, res) => {
  try {
    const postID = req.params.postID;
    const likers = await likeService.getPostLikers(postID);  // ✅ use the service layer

    const data = likers.map(l => ({
      userID: l.user.id,
      username: l.user.username,
      profilePicture: l.user.profilePicture,
      likedAt: l.createdAt
    }));

    res.json({
      postID,
      likesCount: data.length,
      recentUser: data[0] || null,
      likers: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
