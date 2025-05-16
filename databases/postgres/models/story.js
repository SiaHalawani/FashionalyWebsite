module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
    userID: { type: DataTypes.INTEGER, allowNull: false },
    mediaURL: { type: DataTypes.STRING, allowNull: false },
    mediaType: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
  }, { timestamps: true });

  Story.associate = (models) => {
    Story.belongsTo(models.user, { foreignKey: 'userID' }); // lowercase 'user'
    Story.hasMany(models.highlightstory, { foreignKey: 'storyID' });
  };

  return Story;
};
