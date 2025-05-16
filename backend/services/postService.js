
const { Op } = require('sequelize');
const { socialpost, collection, follower, user  } = require('../../databases/postgres/models');

exports.createPost = async (data) => {
  try {
    console.log('DEBUG post insert:', {
      collectionID: data.collectionID,
      userID: data.userID
    });
    // Validate collection exists
    const postCollection = await collection.findByPk(data.collectionID);
    if (!postCollection) {
      throw new Error('Collection not found.');
    }

    const newPost = await socialpost.create({
      postContent: data.postContent,
      postImageURL: data.postImageURL,
      postType: data.postType || 'public',
      outfitID: data.outfitID,
      userID: data.userID,
      collectionID: data.collectionID
    });

    return newPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllPosts = async (collectionID) => {
  let whereClause = {};

  if (collectionID === 'null') {
    whereClause.collectionID = null;
  } else if (collectionID) {
    whereClause.collectionID = collectionID;
  }

  return await socialpost.findAll({
    where: whereClause,
    include: ['user']
  });
};

exports.getUserPosts = async (userID) => {
  return await socialpost.findAll({ where: { userID }, include: ['user'] });
};

exports.deletePost = async (postID, userID) => {
  return await socialpost.destroy({ where: { postID, userID } });
};

exports.updatePost = async (postID, userID, data) => {
  const post = await socialpost.findOne({ where: { postID, userID } });
  if (!post) throw new Error('Post not found or access denied');

  await post.update({
    postContent: data.postContent ?? post.postContent,
    postImageURL: data.postImageURL ?? post.postImageURL,
    postType: data.postType ?? post.postType,
    collectionID: data.collectionID ?? post.collectionID
  });

  return post;
};

exports.bulkCreatePosts = async (posts) => {
  return await socialpost.bulkCreate(posts, { validate: true });
};

exports.getPostByID = async (postID) => {
  const post = await socialpost.findOne({
    where: { postID },
    include: ['user'] // or other associations if needed
  });

  if (!post) throw new Error('Post not found.');
  return post;
};

exports.getPostsOfFollowedUser = async (userID, friendID) => {
  const { follower } = require('../../databases/postgres/models');
  const isFollowing = await follower.findOne({
    where: { followerID: userID, followingID: friendID }
  });

  const whereCondition = {
    userID: friendID,
    ...(isFollowing ? {} : { postType: 'public' }) // If not following, restrict to public
  };

  return await socialpost.findAll({
    where: whereCondition,
    include: [{ model: user, attributes: ['userID', 'username', 'profilePicture'] }],
    order: [['createdAt', 'DESC'], ['postID', 'DESC']]
  });
};

exports.getFollowingPosts = async (userID) => {
  const followings = await follower.findAll({
    where: { followerID: userID },
    attributes: ['followingID']
  });

  const followingIDs = followings.map(f => f.followingID);

  return await socialpost.findAll({
    where: {
      userID: {
        [Op.in]: followingIDs
      },
      [Op.or]: [
        { postType: 'public' },
        {
          postType: 'private',
          userID: userID // Show user's own private posts
        }
      ]
    },
    include: [{ model: user, attributes: ['userID', 'username', 'profilePicture'] }],
    order: [['createdAt', 'DESC'], ['postID', 'DESC']]
  });
};
