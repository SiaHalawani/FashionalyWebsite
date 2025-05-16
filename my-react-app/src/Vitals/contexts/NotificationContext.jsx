// 📁 src/contexts/NotificationContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getNotifications } from '../../BackendIntegration/AxiosConnections/Notifications/notificationAxios';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data || []);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
