module.exports = (sequelize, DataTypes) => {
  const HighlightStory = sequelize.define('highlightstory', {
    highlightID: { type: DataTypes.INTEGER, allowNull: false },
    storyID: { type: DataTypes.INTEGER, allowNull: false }
  }, { timestamps: true });

  HighlightStory.associate = (models) => {
    HighlightStory.belongsTo(models.highlight, { foreignKey: 'highlightID' });
    HighlightStory.belongsTo(models.story, { foreignKey: 'storyID' });
  };

  return HighlightStory;
};
