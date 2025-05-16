import React from 'react';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';

const TabNavigation = ({ activeTab, setActiveTab, getTotalCount }) => (
  <div className={SellerStyle.navTabs}>
    {['items', 'posts', 'dashboard'].map((section) => (
      <div
        key={section}
        onClick={() => {
          setActiveTab(section);
        }}
        className={activeTab === section ? SellerStyle.activeTab : SellerStyle.tabItem}
      >
        {getTotalCount(section)} {section.charAt(0).toUpperCase() + section.slice(1)}
      </div>
    ))}
  </div>
);

export default TabNavigation;
