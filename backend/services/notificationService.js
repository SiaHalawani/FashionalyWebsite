const { notification, socialpost, user } = require('../../databases/postgres/models');

exports.create = async ({ userID, actorID, type, targetID = null }) => {
  if (userID === actorID) return null; // skip self-notifications

  return await notification.create({ userID, actorID, type, targetID });
};

exports.getAll = async (userID) => {
  const notes = await notification.findAll({
    where: { userID },
    include: [{ association: 'actor', attributes: ['userID', 'username', 'profilePicture'] }],
    order: [['createdAt', 'DESC']]
  });

  const messages = await Promise.all(notes.map(async note => {
    let message = '';
    if (note.type === 'follow') {
      message = `${note.actor.username} started following you.`;
    } else if (note.type === 'like') {
      const post = await socialpost.findByPk(note.targetID, {
        attributes: ['postContent']
      });
      message = `${note.actor.username} liked your post${post?.postContent ? `: "${post.postContent.slice(0, 50)}..."` : ''}`;
    } else if (note.type === 'comment') {
      const post = await socialpost.findByPk(note.targetID, {
        attributes: ['postContent']
      });
      message = `${note.actor.username} commented on your post${post?.postContent ? `: "${post.postContent.slice(0, 50)}..."` : ''}`;
    }

    return {
      id: note.id,
      type: note.type,
      read: note.read,
      createdAt: note.createdAt,
      actor: note.actor,
      targetID: note.targetID,
      message
    };
  }));

  return messages;
};

exports.markAsRead = async (userID, notificationID) => {
  const note = await notification.findOne({ where: { userID, id: notificationID } });
  if (!note) throw new Error('Notification not found.');
  note.read = true;
  await note.save();
  return note;
};

exports.delete = async (userID, notificationID) => {
  const target = await notification.findOne({ where: { id: notificationID, userID } });
  if (!target) return false;

  await target.destroy();
  return true;
};
