module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    userID: { type: DataTypes.INTEGER, allowNull: false },          // receiver
    actorID: { type: DataTypes.INTEGER, allowNull: false },         // who triggered it
    type: { type: DataTypes.STRING, allowNull: false },             // 'follow' | 'like' | 'comment'
    targetID: { type: DataTypes.INTEGER },                          // postID or null
    read: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { timestamps: true });

  Notification.associate = (models) => {
    Notification.belongsTo(models.user, { as: 'actor', foreignKey: 'actorID' });
  };

  return Notification;
};
