import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { markNotificationAsRead } from '../../../../../BackendIntegration/AxiosConnections/Notifications/notificationAxios';
import { useNotifications } from '../../../../contexts/NotificationContext';

import styles from '../../../../CSS/notifications.module.css';

export default function Notifications() {
  const { notifications, fetchNotifications } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications(); // Ensure latest notifications when page opens
  }, []);

  const handleMarkRead = async (id) => {
    await markNotificationAsRead(id);
    fetchNotifications(); // Sync context (updates Headerbar too)
  };

  return (
    <div className={styles.notificationContainer}>
      <h2>🔔 Notifications</h2>

      {notifications.map(note => (
        <div
          key={note.id}
          className={`${styles.notificationCard} ${note.read ? styles.read : styles.unread}`}
          onClick={() => handleMarkRead(note.id)}
        >
          <img
            src={note.actor.profilePicture}
            alt={note.actor.username}
            className={styles.avatar}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/User/${note.actor.userID}`);
            }}
          />
          <div className={styles.messageWrapper}>
            <div className={styles.textSection}>
              <p className={styles.message}>{note.message}</p>
              <span className={styles.time}>{new Date(note.createdAt).toLocaleString()}</span>
            </div>
            {!note.read && <span className={styles.unreadDot}></span>}
          </div>
        </div>
      ))}
    </div>
  );
}
