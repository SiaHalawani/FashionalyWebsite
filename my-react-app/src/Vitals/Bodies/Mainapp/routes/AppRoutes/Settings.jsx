import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../../../BackendIntegration/UserData/GeneralDataManagement';
import ThemeToggler from '../../../../Components/themetoggler';
import EditProfile from '../MainComponents/User/UserComps/EditProfile';
import styles from '../../../../CSS/PokeStyles.module.css';

export default function Settings() {
  const navigate = useNavigate();
  const { profileData } = useGlobalState();

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

  const [activeTab, setActiveTab] = useState('main');

  const toggleSetting = (setter) => (key) =>
    setter((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login', { replace: true });
  };

  if (activeTab === 'edit') return <EditProfile onCancel={() => setActiveTab('main')} />;

  if (activeTab === 'report') {
    return (
      <div className={styles.filterTab}>
        <button className={styles.button} onClick={() => setActiveTab('main')}>← Back</button>
        <h2 className={styles.title}>Report a Problem</h2>
        <p className={styles.label}>
          We're here to help. If you've encountered a bug, security issue, or offensive behavior,
          please describe it in detail below. Include steps to reproduce, screenshots, and any
          additional context that may help us investigate and resolve the issue efficiently.
        </p>
        <textarea className={styles.input} rows={6} placeholder="Describe the problem..." />
        <div className={styles.buttonGroup}>
          <button className={styles.button}>Submit Report</button>
        </div>
      </div>
    );
  }

  if (activeTab === 'help') {
    return (
      <div className={styles.filterTab}>
        <button className={styles.button} onClick={() => setActiveTab('main')}>← Back</button>
        <h2 className={styles.title}>Help Center</h2>
        <p className={styles.label}>
          Welcome to the Help Center. Browse through common questions and answers to better
          understand how to use our platform. Topics include:
        </p>
        <ul className={styles.filterGroup}>
          <li className={styles.label}>• Account creation and login issues</li>
          <li className={styles.label}>• Uploading items and creating posts</li>
          <li className={styles.label}>• Privacy settings and user controls</li>
          <li className={styles.label}>• Understanding the Explore and Feed features</li>
        </ul>
        <p className={styles.label}>
          If your question isn't answered here, please contact our support team or report a problem.
        </p>
      </div>
    );
  }

  if (activeTab === 'apps') {
    return (
      <div className={styles.filterTab}>
        <button className={styles.button} onClick={() => setActiveTab('main')}>← Back</button>
        <h2 className={styles.title}>Apps & Websites</h2>
        <p className={styles.label}>
          This section will show a list of apps and websites that you've authorized to access
          your account. You can revoke access at any time. This is important to protect your
          data and ensure no third-party services are misusing your content or credentials.
        </p>
        <p className={styles.label}>Coming soon: integration management and permission settings.</p>
      </div>
    );
  }

  if (activeTab === 'about') {
    return (
      <div className={styles.filterTab}>
        <button className={styles.button} onClick={() => setActiveTab('main')}>← Back</button>
        <h2 className={styles.title}>About</h2>
        <p className={styles.label}>
          Fashonly is a modern social fashion platform where users can build digital wardrobes,
          share outfit inspiration, and discover new styles through an intelligent AI-powered feed.
        </p>
        <p className={styles.label}>
          Founded in 2025, our mission is to create a connected fashion ecosystem that empowers
          self-expression, sustainability, and personalization.
        </p>
        <p className={styles.label}>
          Version: <strong>v1.0.0</strong><br />
          Developers: <strong>Team SiaDavid</strong><br />
          Contact: <strong>support@fashonly.app</strong>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>Settings</h2>

      <div className={styles.filterGroup}>
        <h3 className={styles.label}>Account</h3>
        <button className={styles.button} onClick={() => setActiveTab('edit')}>Edit Profile</button>
        <button className={styles.button} onClick={() => setActiveTab('apps')}>Apps and Websites</button>
        <button className={styles.button}>Change Password</button>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.label}>Privacy</h3>
        {Object.entries(privacy).map(([key, value]) => (
          <div className={styles.dataRow} key={key}>
            <span className={styles.label}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleSetting(setPrivacy)(key)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.label}>Notifications</h3>
        {Object.entries(notifications).map(([key, value]) => (
          <div className={styles.dataRow} key={key}>
            <span className={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleSetting(setNotifications)(key)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.label}>Theme</h3>
        <ThemeToggler />
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.label}>Help & Support</h3>
        <button className={styles.button} onClick={() => setActiveTab('help')}>Help Center</button>
        <button className={styles.button} onClick={() => setActiveTab('report')}>Report a Problem</button>
        <button className={styles.button} onClick={() => setActiveTab('about')}>About</button>
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          style={{ color: '#ed4956' }}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
