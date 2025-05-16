const { follower, user, notification } = require('../../databases/postgres/models');


// exports.followUser = async (followerID, followingID) => {
//   // Prevent users from following themselves
//   if (followerID === followingID) {
//     throw new Error('You cannot follow yourself.');
//   }

//   // Check if the user is already following the target user
//   const existingFollow = await follower.findOne({ where: { followerID, followingID } });

//   // If already following, return the message
//   if (existingFollow) {
//     const followedUser = await user.findOne({ where: { userID: followingID } });
//     return { message: `You are already following ${followedUser.username}.`, data: existingFollow };
//   }

//   // If not, create the follow relationship
//   const follow = await follower.create({ followerID, followingID });

//   // Increment followers and following count
//   await user.increment('followingCount', { where: { userID: followerID } });
//   await user.increment('followersCount', { where: { userID: followingID } });

//   // Check if the reverse follow exists (mutual following)
//   const reverseFollow = await follower.findOne({ where: { followerID: followingID, followingID: followerID } });

//   if (reverseFollow) {
//     const followedUser = await user.findOne({ where: { userID: followingID } });
//     return { message: `You are now following each other.`, data: follow };
//   }

//   // If it's the first follow, return a simple follow message
//   const followedUser = await user.findOne({ where: { userID: followingID } });
//   return { message: `You are now following ${followedUser.username}.`, data: follow };
// };

exports.followUser = async (followerID, followingID) => {
  if (followerID === followingID) throw new Error('You cannot follow yourself.');

  const existingFollow = await follower.findOne({ where: { followerID, followingID } });
  if (existingFollow) {
    const followedUser = await user.findByPk(followingID);
    return { message: `You are already following ${followedUser.username}.`, data: existingFollow };
  }

  const follow = await follower.create({ followerID, followingID });

  await user.increment('followingCount', { where: { userID: followerID } });
  await user.increment('followersCount', { where: { userID: followingID } });

  // 🛎 Notify followed user
  await notification.create({
    userID: followingID,
    actorID: followerID,
    type: 'follow',
    targetID: followerID
  });

  const followedUser = await user.findByPk(followingID);
  return { message: `You are now following ${followedUser.username}.`, data: follow };
};
exports.unfollowUser = async (followerID, followingID) => {
  // Check if the user is following the target user
  const existingFollow = await follower.findOne({ where: { followerID, followingID } });
  if (!existingFollow) {
    throw new Error('You are not following this user.');
  }

  // Remove the follow relationship
  await existingFollow.destroy();

  // Safely decrement followingCount
  const followerUser = await user.findByPk(followerID);
  if (followerUser.followingCount > 0) {
    await user.decrement('followingCount', { where: { userID: followerID } });
  }

  // Safely decrement followersCount
  const followingUser = await user.findByPk(followingID);
  if (followingUser.followersCount > 0) {
    await user.decrement('followersCount', { where: { userID: followingID } });
  }

  return { message: 'Unfollowed successfully.' };
};


exports.getFollowers = async (userID) => {
  // Retrieve all followers of a user
  return await follower.findAll({
    where: { followingID: userID },
    include: [{
      model: user,
      as: 'Follower',
      attributes: ['userID', 'username', 'profilePicture']
    }]
  });
};

exports.getFollowing = async (userID) => {
  // Retrieve all users followed by the user
  return await follower.findAll({
    where: { followerID: userID },
    include: [{
      model: user,
      as: 'Following',
      attributes: ['userID', 'username', 'profilePicture']
    }]
  });
};

exports.removeFollowing = async (followerID, followingID) => {
  const record = await follower.findOne({ where: { followerID, followingID } });
  if (!record) throw new Error('Follow relationship does not exist.');
  
  await record.destroy();

  // Safe decrement of followingCount
  const followerUser = await user.findByPk(followerID);
  if (followerUser.followingCount > 0) {
    await user.decrement('followingCount', { where: { userID: followerID } });
  }

  // Safe decrement of followersCount
  const followingUser = await user.findByPk(followingID);
  if (followingUser.followersCount > 0) {
    await user.decrement('followersCount', { where: { userID: followingID } });
  }

  return { message: 'Removed from following list.' };
};
exports.removeFollower = async (followerID, followingID) => {
  const record = await follower.findOne({ where: { followerID, followingID } });
  if (!record) throw new Error('Follow relationship does not exist.');

  await record.destroy();

  // Safe decrement of followersCount
  const followingUser = await user.findByPk(followingID);
  if (followingUser.followersCount > 0) {
    await user.decrement('followersCount', { where: { userID: followingID } });
  }

  // Safe decrement of followingCount
  const followerUser = await user.findByPk(followerID);
  if (followerUser.followingCount > 0) {
    await user.decrement('followingCount', { where: { userID: followerID } });
  }

  return { message: 'Removed follower successfully.' };
};


exports.getSuggestedFollows = async (userID) => {
  // Step 1: Get the IDs of users you're already following
  const currentFollowings = await follower.findAll({
    where: { followerID: userID },
    attributes: ['followingID']
  });
  const followingIDs = currentFollowings.map(f => f.followingID);

  // Step 2: Get other users not followed yet
  const others = await user.findAll({
    where: {
      userID: {
        [require('sequelize').Op.notIn]: [...followingIDs, Number(userID)]
      }
    },
    attributes: ['userID', 'username', 'profilePicture'],
    limit: 50
  });

  // Step 3: Sort by number of mutuals
  const suggestionsWithMutuals = await Promise.all(
    others.map(async (u) => {
      const mutuals = await follower.count({
        where: {
          followerID: u.userID,
          followingID: {
            [require('sequelize').Op.in]: followingIDs
          }
        }
      });
      return { ...u.dataValues, mutuals };
    })
  );

  return suggestionsWithMutuals
    .sort((a, b) => b.mutuals - a.mutuals)
    .slice(0, 10);
};

exports.bulkFollow = async (followerID, followingIDs) => {
  const results = [];

  for (const followingID of followingIDs) {
    if (followerID === followingID) continue; // Skip self-follow
    const already = await follower.findOne({ where: { followerID, followingID } });
    if (already) continue;

    const follow = await follower.create({ followerID, followingID });
    await user.increment('followingCount', { where: { userID: followerID } });
    await user.increment('followersCount', { where: { userID: followingID } });

    results.push(follow);
  }

  return results;
};

exports.isFollowing = async (followerID, followingID) => {
  const record = await follower.findOne({ where: { followerID, followingID } });
  return !!record; // returns true or false
};

exports.isFollowedBy = async (userID, otherID) => {
  const record = await follower.findOne({ where: { followerID: otherID, followingID: userID } });
  return !!record; // returns true or false
};
