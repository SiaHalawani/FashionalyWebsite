import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Userstyle from '../../../../../../CSS/User.module.css';
import { getFollowersList, getFollowingList } from '../../../../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';

const ProfileHeader = ({ profileData, setEditingProfile, getTotalCount }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const userId = profileData.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const [followers, following] = await Promise.all([
        getFollowersList(userId),
        getFollowingList(userId)
      ]);
      if (followers) setFollowersCount(followers.length);
      if (following) setFollowingCount(following.length);
    };
    if (userId) fetchCounts();
  }, [userId]);

  return (
    <div className={Userstyle.profileTop}>
      {/* === PROFILE PICTURE + EDIT BUTTON === */}
      <div className={Userstyle.profilePicContainer}>
        <img
          src={profileData.profilePicture || '/src/assets/fallback.png'}
          alt="Profile"
          className={Userstyle.profilePic}
        />
        <button className={Userstyle.editBtn} onClick={() => setEditingProfile(true)}>Edit</button>
      </div>

      {/* === PROFILE DETAILS === */}
      <div className={Userstyle.profileStats}>
        <p className={Userstyle.username}><b>@{profileData.username}</b></p>
        <p><strong>Full Name:</strong> {profileData.fullName || 'Not provided'}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Phone:</strong> {profileData.phone || 'N/A'}</p>
        <p><strong>Location:</strong> {profileData.location || 'N/A'}</p>
 
   
        {profileData.bio && <p className={Userstyle.userbio}>{profileData.bio}</p>}
       

        {profileData.verified && <p><strong>Status:</strong> ✅ Verified</p>}
        {profileData.seller && <p><strong></strong> 🛍 Seller</p>}

    
      </div>

      {/* === FOLLOW COUNTS === */}
      <div className={Userstyle.followStats}>
        <div onClick={() => navigate(`/self/followers/${userId}`)}>
          <p><b>{followersCount}</b></p>
          <p>Followers</p>
        </div>
        <div onClick={() => navigate(`/self/following/${userId}`)}>
          <p><b>{followingCount}</b></p>
          <p>Following</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
