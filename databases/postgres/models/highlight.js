module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define('highlight', {
    userID: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    coverURL: { type: DataTypes.STRING }
  }, { timestamps: true });

  Highlight.associate = (models) => {
    Highlight.belongsTo(models.user, { foreignKey: 'userID' }); // lowercase 'user'
    Highlight.hasMany(models.highlightstory, { foreignKey: 'highlightID' });
  };

  return Highlight;
};
