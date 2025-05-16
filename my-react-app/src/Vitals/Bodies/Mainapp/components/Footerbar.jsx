import React, { useState, useEffect } from 'react';
import Sparkle from './sparkle';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaRobot, FaCompass, FaFolder } from 'react-icons/fa';
import { MdOutlineSell } from 'react-icons/md';
import { useWeather } from "../../../../API/WeatherContext"; 
import { getSuggestedUsers, followUser, getUserById } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { useGlobalState } from '../../../../BackendIntegration/UserData/GeneralDataManagement';

import containers from '../../../CSS/containers.module.css';
import styles from '../../../CSS/button.module.css';

export default function Footer() {
  const { profileData } = useGlobalState();
  const userId = profileData.userId;
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sparkleTriggerId, setSparkleTriggerId] = useState(null);
  const weather = useWeather();
  const isDay = weather?.isDay;
  const dayEmoji = isDay ? "Day - " : "Night - ";

  useEffect(() => {
    (async () => {
      const userData = await getUserById(userId);
      const users = await getSuggestedUsers(userId);
      setCurrentUser(userData);
      setSuggestedUsers(users.slice(0, 5));
    })();
  }, []);

  const handleFollow = async (followingID) => {
    const result = await followUser(userId, followingID);
    if (result) {
      setSparkleTriggerId(followingID);
      setSuggestedUsers(prev => prev.filter(user => user.userID !== followingID));
      setTimeout(() => setSparkleTriggerId(null), 500);
    }
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <footer className={containers.footercontainer}>
      {/* === Desktop View === */}
      <div className={containers.desktopOnly} style={{ flex: 1 }}>
        <div className={containers.userSection}>
          <img src={currentUser.profilePicture || '/src/assets/default-avatar.png'} alt={currentUser.username} />
          <div className={containers.userInfo}>
            <p className={containers.username}>{currentUser.username}</p>
            <p className={containers.displayName}>{currentUser.fullName}</p>
          </div>
        </div>

        <div className={containers.suggestSection}>
          <div className={containers.suggestHeader}>
            <p>Suggested for you</p>
          </div>
          {suggestedUsers.length === 0 ? (
            <p>No suggested users to follow.</p>
          ) : (
            suggestedUsers.map((user) => (
              <div key={user.userID} className={containers.suggestUser} style={{ position: 'relative' }}>
                <Link to={`/Fashop/User/${user.userID}`} style={styles.link}>
                  <img
                    src={user.profilePicture || '/src/assets/default-avatar.png'}
                    alt={user.username}
                    style={styles.profileImage}
                  />
                </Link>
                <div className={containers.suggestText}>
                  <p className={containers.username}>{user.username}</p>
                </div>
                <button
                  className={styles.followBtn}
                  onClick={() => handleFollow(user.userID)}
                >
                  Follow
                </button>
                {sparkleTriggerId === user.userID && <Sparkle trigger={true} />}
              </div>
            ))
          )}
        </div>
      </div>

      {/* === Sticky Footer Info Section (bottom aligned) === */}
      <div className={containers.desktopOnly} style={{ marginTop: 'auto' }}>
        <div className={containers.footerLinks}>
          {weather && (
            <div style={{ fontSize: '0.85rem' }}>
              {dayEmoji} {weather.temperature}°C · {weather.condition} · {weather.wind} km/h wind · {weather.humidity}% humidity
            </div>
          )}
          <p>About · Help · API · Privacy · Terms · Locations · Language · Fashonly Verified</p>
          <p>© 2025 Fashonly from David, Sondos</p>
        </div>
      </div>

      {/* === Mobile Nav View === */}
      <nav className={containers.mobileOnly}>
        <Link to="/Home/home" className="icon"><FaHome /></Link>
        <Link to="/Home/explore" className="icon"><FaCompass /></Link>
        <Link to="/Home/ai" className="icon"><FaRobot /></Link>
        <Link to="/Home/profile" className="icon"><FaUser /></Link>
        <Link to="/Home/EditItem" className="icon"><FaFolder /></Link>
      </nav>
    </footer>
  );
}
