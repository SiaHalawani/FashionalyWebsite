import React from 'react';
import Sellerstyle from '../../../../../CSS/Sellercss/SellerDashboard.module.css';

const TabNavigation = ({ activeTab, setActiveTab, getTotalCount }) => {
  return (
    <div className={Sellerstyle.navTabs}>
      {['posts', 'wardrobe', 'outfits', 'collections'].map((section) => (
        <div
          key={section}
          onClick={() => setActiveTab(section)}
          className={activeTab === section ? Sellerstyle.activeTab : Sellerstyle.tabItem}
        >
          {getTotalCount(section)} {section.charAt(0).toUpperCase() + section.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
