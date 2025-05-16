const commentService = require('../services/commentService');

exports.create = async (req, res) => {
  try {
    const comment = await commentService.addComment({
      postID: req.body.postID,
      userID: req.user.id,
      text: req.body.commentText
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getByPost = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByPost(req.params.postID);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.commentID, req.user.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { commentID } = req.params;
    const { commentText } = req.body;
    const updated = await commentService.updateComment(commentID, req.user.id, commentText);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentCount = async (req, res) => {
  try {
    const count = await commentService.countCommentsByPost(req.params.postID);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkCreate = async (req, res) => {
  try {
    const comments = req.body.map(c => ({
      postID: c.postID,
      userID: req.user.id,
      commentText: c.commentText
    }));

    const created = await commentService.bulkAddComments(comments);
    res.status(201).json({ success: true, created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
