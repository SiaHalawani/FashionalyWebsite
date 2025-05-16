
const { comment, user, socialpost, notification } = require('../../databases/postgres/models');

// exports.addComment = async ({ postID, userID, text }) => {
//   const newComment = await comment.create({
//     postID,
//     userID,
//     commentText: text
//   });

//   // ✅ Increment the post's comment count
//   await socialpost.increment('commentsCount', { where: { postID } });

//   return newComment;
// };

exports.addComment = async ({ postID, userID, text }) => {
  const newComment = await comment.create({
    postID,
    userID,
    commentText: text
  });

  await socialpost.increment('commentsCount', { where: { postID } });

  // 🛎 Notify post owner
  const post = await socialpost.findByPk(postID);
  if (post && post.userID !== userID) {
    await notification.create({
      userID: post.userID,
      actorID: userID,
      type: 'comment',
      targetID: postID
    });
  }

  return newComment;
};


exports.getCommentsByPost = async (postID) => {
  return await comment.findAll({
    where: { postID },
    include: [{
      model: user,
      attributes: ['username', 'profilePicture']  // ✅ match the actual field name
    }],
    order: [['commentDate', 'ASC']]
  });
};

exports.deleteComment = async (commentID, userID) => {
  const target = await comment.findOne({ where: { commentID, userID } });
  if (!target) throw new Error('Comment not found or unauthorized.');

  await target.destroy();

  // ✅ Decrement the post's comment count
  await socialpost.decrement('commentsCount', { where: { postID: target.postID } });

  return { message: 'Comment deleted successfully.' };
};


exports.updateComment = async (commentID, userID, text) => {
  const existing = await comment.findOne({ where: { commentID, userID } });
  if (!existing) throw new Error('Comment not found or unauthorized.');

  await existing.update({ commentText: text });
  return existing;
};

exports.countCommentsByPost = async (postID) => {
  return await comment.count({ where: { postID } });
};

exports.bulkAddComments = async (comments) => {
  const created = await comment.bulkCreate(comments, { validate: true });

  // 🔁 Count how many comments per postID
  const postCounts = {};
  for (const c of comments) {
    postCounts[c.postID] = (postCounts[c.postID] || 0) + 1;
  }

  // ✅ Increment the count for each post
  await Promise.all(Object.entries(postCounts).map(([postID, count]) => {
    return socialpost.increment('commentsCount', {
      by: count,
      where: { postID }
    });
  }));

  return created;
};

