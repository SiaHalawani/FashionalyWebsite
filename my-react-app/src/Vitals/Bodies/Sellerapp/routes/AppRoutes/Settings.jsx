// Settings.jsx
import { useState } from 'react';
import styles from '../../../../CSS/Settings.module.css';
import ThemeToggler from '../../../../Components/themetoggler';
export default function Settings() {
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: false,
    follows: true,
  });
  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    activityStatus: true,
    storySharing: false,
  });

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  const togglePrivacy = (key) =>
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Settings</h1>
      <div className={styles.container}>
        {/* Account Section */}
        <section className={styles.section}>
          <h2 className={styles.title}>Account</h2>
          <ul className={styles.list}>
            <li className={styles.item}>Edit Profile</li>
            <li className={styles.item}>Change Password</li>
            <li className={styles.item}>Apps and Websites</li>
          </ul>
          <ThemeToggler className="theme-toggler"/>
        </section>

        {/* Privacy Section */}
        <section className={styles.section}>
          <h2 className={styles.title}>Privacy</h2>
          <ul className={styles.list}>
            {Object.entries(privacy).map(([key, val]) => (
              <li key={key} className={styles.toggleItem}>
                <span className={styles.label}>
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={() => togglePrivacy(key)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Notifications Section */}
        <section className={styles.section}>
          <h2 className={styles.title}>Notifications</h2>
          <ul className={styles.list}>
            {Object.entries(notifications).map(([key, val]) => (
              <li key={key} className={styles.toggleItem}>
                <span className={styles.label}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={() => toggleNotification(key)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        {/* Help & Support Section */}
        <section className={styles.section}>
          <h2 className={styles.title}>Help & Support</h2>
          <ul className={styles.list}>
            <li className={styles.item}>Help Center</li>
            <li className={styles.item}>Report a Problem</li>
            <li className={styles.item}>About</li>
          </ul>
        </section>

        {/* Log Out Button */}
        <div className={styles.footer}>
          <button className={styles.logoutBtn}>Log Out</button>
        </div>
      </div>
    </div>
  );
}
