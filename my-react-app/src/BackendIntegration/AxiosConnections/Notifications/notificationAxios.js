import axios from 'axios';

export const getNotifications = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("No auth token found");
    return [];
  }

  try {
    const res = await axios.get('http://localhost:5005/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Failed to fetch notifications:', error);
    return [];
  }
};

// PATCH a notification as read
export const markNotificationAsRead = async (notificationID) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.patch(`http://localhost:5005/api/notifications/${notificationID}/read`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(`❌ Failed to mark notification ${notificationID} as read`, err);
  }
};

