const service = require('../services/notificationService');
const notificationService = require('../services/notificationService');

exports.getMyNotifications = async (req, res) => {
  try {
    const data = await service.getAll(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const note = await service.markAsRead(req.user.id, req.params.notificationID);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllNotifications = async (req, res) => {
  const userID = parseInt(req.params.userID);
  if (!userID) return res.status(400).json({ error: 'Invalid user ID' });

  try {
    const notes = await notificationService.getAll(userID);

    const formatted = await Promise.all(notes.map(async (n) => {
      let message = '';
      switch (n.type) {
        case 'like':
          message = `${n.actor.username} liked your post`;
          break;
        case 'comment':
          message = `${n.actor.username} commented on your post`;
          break;
        case 'follow':
          message = `${n.actor.username} started following you`;
          break;
        default:
          message = `${n.actor.username} sent you a notification`;
      }

      return {
        id: n.id,
        type: n.type,
        read: n.read,
        createdAt: n.createdAt,
        actor: n.actor,
        targetID: n.targetID,
        message
      };
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const userID = req.user.id;
  const notificationID = parseInt(req.params.notificationID);

  try {
    const deleted = await notificationService.delete(userID, notificationID);
    if (!deleted) return res.status(404).json({ error: 'Notification not found or unauthorized' });

    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
