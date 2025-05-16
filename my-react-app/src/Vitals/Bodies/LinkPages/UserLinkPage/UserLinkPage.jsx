import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { getUserById, followUser } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { checkIfFollowing, unfollowUser, getWardrobeItemsByUser } from './Axios';
import Userstyle from '../../../CSS/User.module.css';

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
    <div className={Userstyle.userContainer}>
      <div className={Userstyle.userheadpage}>
        <div className={Userstyle.profileTop}>
          <div className={Userstyle.profilePicContainer}>
            <img
              src={userData.profilePicture || '/src/assets/profilepic.png'}
              alt="User"
              className={Userstyle.profilePic}
            />
            <button className={Userstyle.editBtn} onClick={() => navigate(-1)}>Go Back</button>
          </div>
          <div className={Userstyle.profileStats}>
            <p className={Userstyle.username}><b>{userData.username}</b></p>
            <p className={Userstyle.userbio}>{userData.bio || 'No bio available.'}</p>
            <p className={Userstyle.userinfo}>📧 {userData.email}</p>
            {userData.location && <p className={Userstyle.userlocation}>{userData.location}</p>}
            {currentUserID !== Number(userID) && (
              isFollowing ? (
                <button className={Userstyle.unfollowBtn} onClick={handleUnfollow}>Unfollow</button>
              ) : (
                <button className={Userstyle.followBtn} onClick={handleFollow}>Follow</button>
              )
            )}
          </div>
          <div className={Userstyle.followStats}>
            <div><p><b>{userData.followersCount}</b></p><p>Followers</p></div>
            <div><p><b>{userData.followingCount}</b></p><p>Following</p></div>
            <div><p><b>{userData.verified ? '✔️' : '❌'}</b></p><p>Verified</p></div>
          </div>
        </div>
      </div>

      <div className={Userstyle.userbodypage}>
        <div className={Userstyle.navTabs}>
          <div className={Userstyle.activeTab}>
            {userData.items?.length || 0} Items
          </div>
        </div>

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {userData.items?.map((item, index) => (
              <div
                key={index}
                className={Userstyle.itemBox}
                onClick={() => navigate(`/Fashop/UserItems/${item.itemID}`, { state: { background: location } })}

                style={{ cursor: 'pointer' }}
              >
                <img src={item.imageURL || '/src/assets/fallback.png'} alt={item.itemName} />
                <p className={Userstyle.itemLabel}><b>{item.itemName}</b></p>
                <p className={Userstyle.itemSub}>{item.color} • {item.material}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
