import React from 'react';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';

const ItemGrid = ({ activeLink, handleItemClick, activeLinkIndex }) => {
  if (!activeLink || !Array.isArray(activeLink.posts)) {
    console.warn("⚠️ ItemGrid: activeLink or items missing", activeLink);
    return null;
  }

  return (
    <div className={SellerStyle.gridItems}>
      {activeLink.posts.map((item, index) => {
        const image = item.image || item.preview || '/src/assets/fallback.png';
        const title = item.title || item.caption || item.itemName || '';
        const subtitle = item.category || item.brand || '';
        return (
          <div
            key={index}
            className={SellerStyle.itemBox}
            onClick={() => handleItemClick({
              ...item,
              sectionIndex: activeLinkIndex,
              groupId: activeLink.id
            })}
          >
            <img src={image} alt={title} />
            <p className={SellerStyle.itemLabel}><b>{title}</b></p>
            <p className={SellerStyle.itemSub}>{subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ItemGrid;
