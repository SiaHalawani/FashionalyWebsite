// SellerLinkPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSellerByBrandName } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/getSellerByBrandName';
import Userstyle from '../../../CSS/User.module.css';
import { useLocation } from 'react-router-dom';

export default function SellerLinkPage() {
  const location = useLocation();
  const { brand } = useParams();
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState(null);
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await getSellerByBrandName(brand);
        setSellerData(data);
      } catch (err) {
        console.error('Failed to load seller data', err);
      }
    };
    if (brand) fetchSeller();
  }, [brand]);

 const handleItemClick = (item) => {
  const itemId = item.itemId || item.id;
  if (!itemId || !sellerData?.sellerId) return;
  navigate(`/Fashop/Item/${sellerData.sellerId}/${itemId}`, { state: { background: location } });
};


  const getTotalCount = (section) => {
    if (!sellerData?.[section]) return 0;
    return sellerData[section].reduce((acc, link) => acc + (link.items?.length || 0), 0);
  };

  const sellerItems = sellerData?.sellerItems || [];
  const activeLink = sellerItems?.[activeLinkIndex] || { items: [], id: '' };

  return (
    <div className={Userstyle.userContainer}>
      <div className={Userstyle.userheadpage}>
        <div className={Userstyle.profileTop}>
          <div className={Userstyle.profilePicContainer}>
            <img src="/src/assets/profilepic.png" alt="Seller" className={Userstyle.profilePic} />
            <button className={Userstyle.editBtn} onClick={() => navigate(-1)}>Go Back</button>
          </div>
          <div className={Userstyle.profileStats}>
            <p className={Userstyle.username}><b>{sellerData?.SellerName}</b></p>
            <p className={Userstyle.userbio}>{sellerData?.SellerBrandName}</p>
            <p className={Userstyle.userinfo}>📞 {sellerData?.Sellerphone} | 📧 {sellerData?.SellerEmail}</p>
            <p className={Userstyle.userlocation}>{sellerData?.Sellerwebsite}</p>
            <p className={Userstyle.userlocation}>{sellerData?.SellerInstagram}</p>
          </div>
          <div className={Userstyle.followStats}>
            <div><p><b>{sellerData?.stats?.followers}</b></p><p>Followers</p></div>
            <div><p><b>{sellerData?.stats?.rating}</b></p><p>Rating</p></div>
            <div><p><b>${(sellerData?.AdBudget?.currentFunds || 0).toFixed(2)}</b></p><p>Ad Funds</p></div>
          </div>
        </div>
      </div>

      <div className={Userstyle.userbodypage}>
        <div className={Userstyle.navTabs}>
          <div className={Userstyle.activeTab}>
            {getTotalCount('sellerItems')} Items
          </div>
        </div>

        <div className={Userstyle.linksBar}>
          {sellerItems.map((link, i) => (
            <div
              key={`${link.title}-${i}`}
              onClick={() => setActiveLinkIndex(i)}
              className={Userstyle.linkItem}
              style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
            >
              <span>{link.title}</span>
            </div>
          ))}
        </div>

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {activeLink.items.map((item, index) => {
              const image = item.image || item.preview || '/src/assets/fallback.png';
              const title = item.itemName || item.title || '';
              const subtitle = item.category || item.type || '';
              return (
                <div
                  key={index}
                  className={Userstyle.itemBox}
                  onClick={() => handleItemClick(item, activeLink.id)}
                >
                  <img src={image} alt={title} />
                  <p className={Userstyle.itemLabel}><b>{title}</b></p>
                  <p className={Userstyle.itemSub}>{subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
