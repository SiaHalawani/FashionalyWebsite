import React from 'react';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';

const LinkBar = ({ currentCategory, activeLinkIndex, setActiveLinkIndex }) => (
  <div className={SellerStyle.linksBar}>
    {currentCategory.map((link, i) => (
      <div
        key={`${link.title}-${i}`}
        onClick={() => setActiveLinkIndex(i)}
        className={SellerStyle.linkItem}
        style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
      >
        <span>{link.title}</span>
      </div>
    ))}
  </div>
);

export default LinkBar;
