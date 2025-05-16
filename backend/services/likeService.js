
const { notification, socialpost, like } = require('../../databases/postgres/models');
// exports.likePost = async ({ postID, userID }) => {
//   const [likeRecord, created] = await like.findOrCreate({ where: { postID, userID } });

//   if (created) {
//     await socialpost.increment('likesCount', { where: { postID } });
//   }

//   return likeRecord;
// };



exports.likePost = async ({ postID, userID }) => {
  const [likeRecord, created] = await like.findOrCreate({ where: { postID, userID } });

  if (created) {
    await socialpost.increment('likesCount', { where: { postID } });

    // 🛎 Notify post owner
    const post = await socialpost.findByPk(postID);
    if (post && post.userID !== userID) {
      await notification.create({
        userID: post.userID,
        actorID: userID,
        type: 'like',
        targetID: postID
      });
    }
  }

  return likeRecord;
};

exports.unlikePost = async ({ postID, userID }) => {
  const deleted = await like.destroy({ where: { postID, userID } });

  if (deleted) {
    await socialpost.decrement('likesCount', { where: { postID } });
  }

  return deleted;
};


exports.countLikes = async (postID) => {
  return await like.count({ where: { postID } });
};

exports.getUserLikes = async (userID) => {
  return await like.findAll({ where: { userID } });
};

exports.bulkLikePosts = async (userID, postIDs) => {
  const createdLikes = [];

  for (const postID of postIDs) {
    const [likeRecord, created] = await like.findOrCreate({ where: { postID, userID } });

    if (created) {
      await socialpost.increment('likesCount', { where: { postID } });
    }

    createdLikes.push(likeRecord);
  }

  return createdLikes;
};

exports.getPostLikers = async (postID) => {
  return await like.findAll({
    where: { postID },
    order: [['createdAt', 'DESC']],
    include: ['user']  // This assumes you have the `belongsTo` relation set correctly in the model
  });
};
