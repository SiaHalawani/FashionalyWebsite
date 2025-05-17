import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { getUserById, followUser } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { checkIfFollowing, unfollowUser, getWardrobeItemsByUser } from './Axios';
import styles from './UserLinkPage.module.css';
import fallbackPic from '../../../../../public/fallback.webp'; // adjust the path as needed

export default function UserLinkPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userID } = useParams();
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("🌐 Starting fetch for userID:", userID);
      const data = await getUserById(userID);
      console.log("📦 getUserById result:", data);

      const items = await getWardrobeItemsByUser(userID);

      if (data) {
        setUserData({
          ...data,
          items
        });

        const token = localStorage.getItem('token');
        const localUserData = localStorage.getItem('userData');
        console.log("🔐 Retrieved token:", token);
        console.log("👤 Raw userData from localStorage:", localUserData);

        if (!token || !localUserData) {
          console.warn("⚠️ Missing token or userData, cannot check follow status.");
          return;
        }

        const parsed = JSON.parse(localUserData);
        const loggedInUserID = parsed?.user?.userID;
        setCurrentUserID(loggedInUserID);

        console.log("🧾 Parsed loggedInUserID:", loggedInUserID);
        console.log("📨 Target (viewed) userID:", userID);

        const followingStatus = await checkIfFollowing(userID);
        console.log("📥 isUserFollowing result:", followingStatus);
        setIsFollowing(followingStatus);
      }
    };

    fetchUser();
  }, [userID]);

  const handleFollow = async () => {
    const parsed = JSON.parse(localStorage.getItem('userData'));
    const followerID = parsed?.user?.userID;
    const followingID = Number(userID);

    if (!followerID || followerID === followingID) return;

    try {
      const res = await followUser(followerID, followingID);
      if (res) {
        console.log("✅ Successfully followed.");
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  const handleUnfollow = async () => {
    const parsed = JSON.parse(localStorage.getItem('userData'));
    const followerID = parsed?.user?.userID;
    const followingID = Number(userID);

    if (!followerID || followerID === followingID) return;

    try {
      const res = await unfollowUser(followerID, followingID);
      if (res) {
        console.log("🗑️ Successfully unfollowed.");
        setIsFollowing(false);
      }
    } catch (error) {
      console.error('Unfollow error:', error);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div> <button className={styles.closeBtn} onClick={() => navigate(-1)}>×</button>
  <div className={styles.userContainer}>
   

    <div className={styles.userheadpage}>
      <div className={styles.profileTop}>
        {/* Profile Picture */}
        <div className={styles.profilePicContainer}>
          <img
            src={userData.profilePicture || fallbackPic}

            className={styles.profilePic}
          />
        </div>

        {/* User Info */}
        <div className={styles.profileStats}>
          <p className={styles.username}><b>{userData.username}</b></p>
          <p className={styles.userbio}>{userData.bio || 'No bio available.'}</p>

          <p className={styles.userinfo}>
            📧 <a href={`mailto:${userData.email}`}>{userData.email}</a>
          </p>

          {userData.location && (
            <p className={styles.userinfo}>
              📍 <a href={`https://www.google.com/maps/search/${userData.location}`} target="_blank" rel="noreferrer">
                {userData.location}
              </a>
            </p>
          )}

         {currentUserID !== Number(userID) && (
  <button
    className={`${styles.followToggleBtn} ${isFollowing ? styles.unfollow : styles.follow}`}
    onClick={isFollowing ? handleUnfollow : handleFollow}
  >
    {isFollowing ? 'Unfollow' : 'Follow'}
  </button>
)}

        </div>

        {/* Status Section */}
        <div className={styles.followStats}>
          <div>
            <p><b>{userData.followersCount}</b></p>
            <p>Followers</p>
          </div>
          <div>
            <p><b>{userData.followingCount}</b></p>
            <p>Following</p>
          </div>
          <div>
            <p><b>{userData.verified ? '✔️' : '❌'}</b></p>
            <p>Verified</p>
          </div>
        </div>
      </div>
    </div>

    <div className={styles.userbodypage}>
      <div className={styles.navTabs}>
        <div className={styles.activeTab}>{userData.items?.length || 0} Items</div>
      </div>

      <div className={styles.tabContent}>
        <div className={styles.gridItems}>
          {userData.items?.map((item, index) => (
            <div
              key={index}
              className={styles.itemBox}
              onClick={() => navigate(`/Fashop/UserItems/${item.itemID}`, { state: { background: location } })}
            >
              <img
  src={userData.profilePicture || fallbackPic}
  alt="User"
  className={styles.profilePic}
/>

              <p className={styles.itemLabel}><b>{item.itemName}</b></p>
              <p className={styles.itemSub}>{item.color} • {item.material}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </div>
);

}
