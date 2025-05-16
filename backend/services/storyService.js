// services/storyService.js
const models = require('../../databases/postgres/models');
const Story = models.story;
const User = models.user;

const { Op } = require('sequelize');

// inline fallback for getFollowingUserIDs (to avoid modifying other services)
const getFollowingUserIDs = async (userID) => {
  const followModel = models.follower;
  const records = await followModel.findAll({
    where: { followerID: userID },
    attributes: ['followingID']
  });
  return records.map(r => r.followingID);
};

exports.createStory = async ({ userID, mediaURL, mediaType }) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // expires in 24 hrs
  return await Story.create({ userID, mediaURL, mediaType, expiresAt });
};

exports.getStoriesOfFollowedUsers = async (userID) => {
  const followingIDs = await getFollowingUserIDs(userID);
  const now = new Date();

  return await Story.findAll({
    where: {
      userID: { [Op.in]: followingIDs },
      expiresAt: { [Op.gt]: now }
    },
    include: { model: User, attributes: ['userID', 'username', 'profilePicture'] },
    order: [['createdAt', 'DESC']]
  });
};

exports.getStoriesByUser = async (userID) => {
  const now = new Date();
  return await Story.findAll({
    where: { userID, expiresAt: { [Op.gt]: now } },
    order: [['createdAt', 'ASC']]
  });
};

exports.getStoryWithNext = async (storyID, userID) => {
  const current = await Story.findByPk(storyID);
  if (!current || current.userID !== parseInt(userID)) throw new Error('Access denied');

  const next = await Story.findOne({
    where: {
      userID: current.userID,
      createdAt: { [Op.gt]: current.createdAt },
      expiresAt: { [Op.gt]: new Date() }
    },
    order: [['createdAt', 'ASC']]
  });

  return { current, next };
};

exports.bulkCreateStories = async (storyList) => {
  const now = Date.now();
  const storiesWithExpiry = storyList.map(story => ({
    ...story,
    expiresAt: new Date(now + 24 * 60 * 60 * 1000)
  }));

  return await Story.bulkCreate(storiesWithExpiry);
};


exports.deleteStoryById = async (storyID) => {
  const story = await Story.findByPk(storyID);
  if (!story) throw new Error('Story not found');
  await story.destroy();
};
