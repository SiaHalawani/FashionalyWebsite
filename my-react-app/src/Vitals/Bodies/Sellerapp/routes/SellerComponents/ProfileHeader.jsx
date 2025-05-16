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
      <p className={SellerStyle.userinfo}>
        Items: {getTotalCount('items')} | Posts: {getTotalCount('posts')}
      </p>
      <p className={SellerStyle.userlocation}>{sellerProfile.phone}</p>
    </div>
    <div className={SellerStyle.followStats}>
      <div><p><b>{(computedStats?.followers || 0).toLocaleString()}</b></p><p>Followers</p></div>
      <div><p><b>{(computedStats?.sales || 0).toLocaleString()}</b></p><p>Sales</p></div>
    </div>
  </div>
);

export default ProfileHeader;
