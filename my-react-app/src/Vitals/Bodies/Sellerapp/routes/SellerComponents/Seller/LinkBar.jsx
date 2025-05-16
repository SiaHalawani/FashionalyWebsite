import React from 'react';
import Sellerstyle from '../../../../../CSS/Sellercss/SellerDashboard.module.css';

const LinkBar = ({ activeLink, setActiveLink }) => {
  return (
    <div className={Sellerstyle.linksBar}>
      {activeLink.map((link, index) => (
        <div key={index} onClick={() => setActiveLink(link)}>
          {link.title}
        </div>
      ))}
    </div>
  );
};

export default LinkBar;
