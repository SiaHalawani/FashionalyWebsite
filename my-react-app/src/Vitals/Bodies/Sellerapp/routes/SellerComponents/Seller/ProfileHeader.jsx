import React from 'react';
import Sellerstyle from '../../../../../CSS/Sellercss/SellerDashboard.module.css';

const ProfileHeader = ({ profileData, setEditingProfile, getTotalCount }) => {
  // Ensure safe access to profileData properties with default values
  const followers = profileData.followers || 0;
  const following = profileData.following || 0;

  return (
    <div className={Sellerstyle.profileTop}>
      <div className={Sellerstyle.profilePicContainer}>
        <img src={profileData.profilePicture} alt="Profile" className={Sellerstyle.profilePic} />
        <button className={Sellerstyle.editBtn} onClick={() => setEditingProfile(true)}>Edit</button>
      </div>
      <div className={Sellerstyle.profileStats}>
        <p className={Sellerstyle.sellername}><b>{profileData.sellername}</b></p>
        <p className={Sellerstyle.sellerbio}>{profileData.bio}</p>
        <p className={Sellerstyle.sellerbio}><i>{profileData.about}</i></p>
        <p className={Sellerstyle.sellerinfo}>
          Posts: {getTotalCount('posts')} | Wardrobe: {getTotalCount('wardrobe')}
        </p>
        <p className={Sellerstyle.sellerlocation}>{profileData.location}</p>
      </div>
      <div className={Sellerstyle.followStats}>
        <div><p><b>{(followers / 1000).toFixed(1)}K</b></p><p>Followers</p></div>
        <div><p><b>{following.toLocaleString()}</b></p><p>Following</p></div>
      </div>
    </div>
  );
};

export default ProfileHeader;
