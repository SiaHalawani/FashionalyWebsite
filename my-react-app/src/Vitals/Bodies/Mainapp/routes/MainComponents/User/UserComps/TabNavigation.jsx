import React from 'react';
import Userstyle from '../../../../../../CSS/User.module.css';

const TabNavigation = ({ activeTab, setActiveTab, getTotalCount }) => {
  return (
    <div className={Userstyle.navTabs}>
      {['posts', 'wardrobe', 'outfits'].map((section) => (
        <div
          key={section}
          onClick={() => setActiveTab(section)}
          className={activeTab === section ? Userstyle.activeTab : Userstyle.tabItem}
        >
          {getTotalCount(section)} {section.charAt(0).toUpperCase() + section.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;