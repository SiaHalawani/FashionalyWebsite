// SellerLinkPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSellerByBrandName } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/getSellerByBrandName';
import styles from './SellerLinkPage.module.css';
import { useLocation } from 'react-router-dom';
import fallbackPic from '../../../../assets/fallback.webp'; // adjust the path as needed

export default function SellerLinkPage() {

  const [rating, setRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);

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
  <div className={styles.userContainer}>
    <button className={styles.closeBtn} onClick={() => navigate(-1)}>×</button>

    <div className={styles.userheadpage}>
      <div className={styles.profileTop}>
        {/* Profile Picture + Back Button */}
        <div className={styles.profilePicContainer}>
          <img src={fallbackPic} alt="Seller" className={styles.profilePic} />
         
        </div>
        

       
        {/* Seller Info */}
        <div className={styles.profileStats}>
          <p className={styles.username}><b>{sellerData?.SellerName || sellerData?.SellerBrandName}</b></p>
      
          <p className={styles.userinfo}>
            Email:
            📧 <a href={`mailto:${sellerData?.SellerEmail}`}>{sellerData?.SellerEmail}</a>
          </p>
          <p className={styles.userinfo}>
            Phone:
            📞 <a href={`tel:${sellerData?.Sellerphone}`}>{sellerData?.Sellerphone}</a>
          </p>
          <p className={styles.userinfo}>
            Website:
            🌐 <a href={`https://${sellerData?.Sellerwebsite}`} target="_blank" rel="noreferrer">{sellerData?.Sellerwebsite}</a>
          </p>
          <p className={styles.userinfo}>
            Instagram:
            📸 <a href={`https://instagram.com/${sellerData?.SellerInstagram}`} target="_blank" rel="noreferrer">@{sellerData?.SellerInstagram}</a>
          </p>
        </div>
        {/* Rating Section */}
        <div className={styles.followStats}>
  <div className={styles.ratingDisplay}>
    
    <p>
          Rating: <b>
      {parseFloat(sellerData?.stats?.rating) > 0
        ? sellerData.stats.rating
        : (4)}
        ⭐
    </b></p>
 
  </div>

  <div className={styles.ratingStars}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={star <= rating ? styles.starFilled : styles.starEmpty}
        onClick={() => {
          setRating(star);
       
        }}
      >
        ★
      </span>
    ))}
  </div>
</div>

      </div>
    </div>

    {/* Tabs and Items */}
    <div className={styles.userbodypage}>
      <div className={styles.navTabs}>
        <div className={styles.activeTab}>
          {getTotalCount('sellerItems')} Items
        </div>
      </div>

      <div className={styles.linksBar}>
        {sellerItems.map((link, i) => (
          <div
            key={`${link.title}-${i}`}
            onClick={() => setActiveLinkIndex(i)}
            className={styles.linkItem}
            style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
          >
            <span>{link.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.tabContent}>
        <div className={styles.gridItems}>
          {activeLink.items.map((item, index) => {
            const image = item.image || item.preview || fallbackPic;
            const title = item.itemName || item.title || '';
            const subtitle = item.category || item.type || '';
            return (
              <div
                key={index}
                className={styles.itemBox}
                onClick={() => handleItemClick(item, activeLink.id)}
              >
                <img src={image} alt={title} />
                <p className={styles.itemLabel}><b>{title}</b></p>
                <p className={styles.itemSub}>{subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);



}
