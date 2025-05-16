const highlightService = require('../services/highlightService');

exports.createHighlight = async (req, res) => {
  try {
    const userID = req.user?.id;
    const { title, coverURL } = req.body;
    const highlight = await highlightService.createHighlight({ userID, title, coverURL });
    res.status(201).json(highlight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToHighlight = async (req, res) => {
  try {
    const highlightID = req.params.highlightID;
    const { storyID } = req.body;
    const result = await highlightService.addStoryToHighlight({ highlightID, storyID });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserHighlights = async (req, res) => {
  try {
    const userID = req.params.userID;
    const highlights = await highlightService.getHighlightsByUser(userID);
    res.json(highlights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHighlight = async (req, res) => {
  try {
    const highlightID = req.params.highlightID;
    await highlightService.deleteHighlight(highlightID);
    res.status(200).json({ message: 'Highlight deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editHighlight = async (req, res) => {
  try {
    const highlightID = req.params.highlightID;
    const { title, coverURL } = req.body;
    const updated = await highlightService.updateHighlight(highlightID, { title, coverURL });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.bulkCreateHighlights = async (req, res) => {
  try {
    const userID = req.user?.id;
    const highlightData = req.body.map(h => ({ ...h, userID }));
    const result = await highlightService.bulkCreateHighlights(highlightData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
