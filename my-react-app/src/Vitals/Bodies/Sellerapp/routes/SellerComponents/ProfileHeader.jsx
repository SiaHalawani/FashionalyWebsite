import React from 'react';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';

const ProfileHeader = ({ sellerProfile, computedStats, getTotalCount }) => (
  <div className={SellerStyle.profileTop}>
    <div className={SellerStyle.profilePicContainer}>
      <img
        src={sellerProfile.logo || '/src/assets/fallback.png'}
        alt="Logo"
        className={SellerStyle.profilePic}
      />
    </div>
    <div className={SellerStyle.profileStats}>
      <p className={SellerStyle.username}>
        <b>{sellerProfile.brandName}</b> 
        {sellerProfile.verified && <span className={SellerStyle.verifiedBadge}>✅</span>}
      </p>
      <p className={SellerStyle.userbio}>{sellerProfile.website}</p>
      <p className={SellerStyle.userbio}><i>{sellerProfile.email}</i></p>
      
      <p className={SellerStyle.userlocation}>{sellerProfile.phone}</p>
    </div>
    <div className={SellerStyle.followStats}>
      <p className={SellerStyle.userinfo}>
      
      </p>
       <div><p><b> Items: </b></p><p>{getTotalCount('items')}</p></div>
      <div><p><b> Posts: </b></p><p>{getTotalCount('posts')}</p></div>
    </div>
  </div>
);

export default ProfileHeader;
