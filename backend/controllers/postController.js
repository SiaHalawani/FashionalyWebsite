const postService = require('../services/postService');

exports.create = async (req, res) => {
  try {
    const { collectionID, postContent, postImageURL, postType } = req.body;

    if (!collectionID) {
      return res.status(400).json({ error: 'Collection ID is required.' });
    }

    if (!postContent) {
      return res.status(400).json({ error: 'Post content is required.' });
    }

    const post = await postService.createPost({
      collectionID,
      postContent,
      postImageURL,
      postType,
      userID: req.user.id
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { collectionID } = req.query;
    const posts = await postService.getAllPosts(collectionID);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMine = async (req, res) => {
  try {
    const posts = await postService.getUserPosts(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await postService.deletePost(req.params.postID, req.user.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { postID } = req.params;
    const updates = req.body;
    const post = await postService.updatePost(postID, req.user.id, updates);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkCreate = async (req, res) => {
  try {
    const posts = req.body.map(p => ({
      ...p,
      userID: req.user.id
    }));

    const created = await postService.bulkCreatePosts(posts);
    res.status(201).json({ success: true, created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByID = async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await postService.getPostByID(postID);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getFollowingPosts = async (req, res) => {
  try {
    const posts = await postService.getFollowingPosts(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFriendPosts = async (req, res) => {
  try {
    const { friendID } = req.params;
    const posts = await postService.getPostsOfFollowedUser(req.user.id, friendID);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
