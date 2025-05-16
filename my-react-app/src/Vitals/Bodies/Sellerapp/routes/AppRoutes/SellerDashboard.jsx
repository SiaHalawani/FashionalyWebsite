import React, { useState } from 'react';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';
import ProfileHeader from '../SellerComponents/ProfileHeader';
import TabNavigation from '../SellerComponents/TabNavigation';
import LinkBar from '../SellerComponents/LinkBar';
import ItemGrid from '../SellerComponents/ItemGrid';
import PostGrid from '../SellerComponents/PostGrid';
import AddItem from '../SellerComponents/AddItem';
import ViewItem from '../SellerComponents/ViewItemdashboard';
import ViewPost from '../SellerComponents/ViewPostdashboard';
import Dashboard from '../SellerComponents/Dashboard'; // Import the Dashboard component

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default function SellerDashboard() {
  const {
    sellerComponents,
    setSellerComponents,
    sellerPosts,
    setSellerPosts,
    sellerProfile
  } = useSellerState();

  const [activeTab, setActiveTab] = useState('items');
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adding, setAdding] = useState(null);

  const currentCategory = activeTab === 'items' ? sellerComponents : sellerPosts;
  const activeLink = currentCategory?.[activeLinkIndex] || { items: [] };

  const handleItemClick = (item) => {
    setSelectedItem(item);  // Set selected item for viewing
  };

  const handleGoBack = () => {
    setSelectedItem(null);  // Reset selected item
  };

  const handleAdd = () => setAdding(activeTab);  // Set to adding mode for items or posts

  const deleteLink = (index) => {
    if (currentCategory.length <= 1) return;
    const newData = deepClone(currentCategory);
    newData.splice(index, 1);
    if (activeTab === 'items') setSellerComponents(newData);
    else setSellerPosts(newData);
    setActiveLinkIndex(0);  // Reset active link index
  };

 const getTotalCount = (section) => {
  const data = section === 'items' ? sellerComponents : sellerPosts;

  return data?.reduce((acc, link) => {
    const list = section === 'items'
      ? link.items || []
      : link.items || link.posts || []; // fallback for posts tab
    return acc + list.length;
  }, 0);
};


  // Render the add page for either item or post
  const renderAddPage = (Component) => (
    <Component
      goBack={() => setAdding(null)}  // Close add page
      onAddItem={(item) => {
        const newData = deepClone(currentCategory);
        newData[activeLinkIndex].items.push(item);  // Add new item to the selected link
        if (activeTab === 'items') setSellerComponents(newData);
        else setSellerPosts(newData);
        setAdding(null);  // Close add page after adding
      }}
      sellerData={{ ...sellerProfile, components: sellerComponents }}  // Passing seller data
      category={activeLink.title?.toLowerCase() || 'misc'}  // Pass category name
    />
  );

  // Render AddItem or AddPost based on activeTab
  if (adding === 'item') return renderAddPage(AddItem);
  if (adding === 'post') return renderAddPage(AddPost);

  // Render selected item view (either ViewItem or ViewPost)
  if (selectedItem) {
    const props = {
      item: selectedItem,
      goBack: handleGoBack, // ✅ Fix prop name
    };
  
    return activeTab === 'items' ? <ViewItem {...props} /> : <ViewPost {...props} />;
  }
  

  // Compute stats
  const computedStats = {
    ...(sellerProfile?.stats || {}),
    items: sellerComponents?.reduce((acc, link) => acc + (link.items?.length || 0), 0)
  };

  return (
    <div className={SellerStyle.dashboardBody}>
      <div className={SellerStyle.userContainer}>
        {/* Profile Header Section */}
        <ProfileHeader
          sellerProfile={sellerProfile}
          computedStats={computedStats}
          getTotalCount={getTotalCount}
        />

        {/* Tabs Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          getTotalCount={getTotalCount}
        />

        {/* Section Links */}
        <LinkBar
          currentCategory={currentCategory}
          activeLinkIndex={activeLinkIndex}
          setActiveLinkIndex={setActiveLinkIndex}
        />

        {/* Render Dashboard when "dashboard" tab is selected */}
        {activeTab === 'dashboard' ? (
  <Dashboard />
) : activeTab === 'posts' ? (
  <PostGrid
    activeLink={activeLink}
    handleItemClick={handleItemClick}
    activeLinkIndex={activeLinkIndex}
  />
) : (
  <ItemGrid
    activeLink={activeLink}
    handleItemClick={handleItemClick}
    activeLinkIndex={activeLinkIndex}
  />
)}

      </div>
    </div>
  );
}
