import React from 'react';
import Userstyle from '../../../../../../CSS/User.module.css';

const LinkBar = ({ currentCategory, setActiveLinkIndex, activeLinkIndex }) => {
  return (
    <div className={Userstyle.linksBar}>
      {currentCategory.map((link, i) => (
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
  );
};

export default LinkBar;