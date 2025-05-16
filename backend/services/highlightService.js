// services/highlightService.js
const models = require('../../databases/postgres/models');
const Highlight = models.highlight;
const HighlightStory = models.highlightstory;
const Story = models.story;
const { Op } = require('sequelize');

exports.createHighlight = async ({ userID, title, coverURL }) => {
  return await Highlight.create({ userID, title, coverURL });
};

exports.addStoryToHighlight = async ({ highlightID, storyID }) => {
  const exists = await HighlightStory.findOne({ where: { highlightID, storyID } });
  if (exists) throw new Error('Story already added to this highlight');

  return await HighlightStory.create({ highlightID, storyID });
};

exports.getHighlightsByUser = async (userID) => {
  return await Highlight.findAll({
    where: { userID },
    include: [
      {
        model: HighlightStory,
        include: {
          model: Story,
          where: { expiresAt: { [Op.gt]: new Date() } },
          required: false
        }
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

exports.deleteHighlight = async (highlightID) => {
  await HighlightStory.destroy({ where: { highlightID } }); // delete relations first
  await Highlight.destroy({ where: { id: highlightID } });
};

exports.updateHighlight = async (highlightID, { title, coverURL }) => {
  const highlight = await Highlight.findByPk(highlightID);
  if (!highlight) throw new Error('Highlight not found');

  if (title !== undefined) highlight.title = title;
  if (coverURL !== undefined) highlight.coverURL = coverURL;

  await highlight.save();
  return highlight;
};


exports.bulkCreateHighlights = async (highlights) => {
  return await Highlight.bulkCreate(highlights);
};
