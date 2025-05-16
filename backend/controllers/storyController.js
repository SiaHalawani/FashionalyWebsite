// controllers/storyController.js
const storyService = require('../services/storyService');

exports.createStory = async (req, res) => {
  try {
    const userID = req.user?.id; // ✅ use 'id' from token
    if (!userID) return res.status(401).json({ error: 'Unauthorized: userID missing from token' });

    const story = await storyService.createStory({ ...req.body, userID });
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStories = async (req, res) => {
  try {
    const userID = req.user?.id; // ✅ use 'id' from token
    if (!userID) return res.status(401).json({ error: 'Unauthorized: userID missing from token' });

    const stories = await storyService.getStoriesOfFollowedUsers(userID);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserStories = async (req, res) => {
  try {
    const { userID } = req.params;
    const stories = await storyService.getStoriesByUser(userID);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStoryWithNext = async (req, res) => {
  try {
    const storyID = req.params.storyID;
    const userID = req.user?.id; // ✅ use 'id' from token
    if (!userID) return res.status(401).json({ error: 'Unauthorized: userID missing from token' });

    const result = await storyService.getStoryWithNext(storyID, userID);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkCreateStories = async (req, res) => {
  try {
    const stories = req.body;
    const result = await storyService.bulkCreateStories(stories);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const storyID = req.params.storyID;
    await storyService.deleteStoryById(storyID);
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
