import React, { useState, useEffect } from 'react';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';
import LinkBar from '../SellerComponents/PostLinkBar';
import ItemGrid from '../SellerComponents/PostGrid';
import ViewPost from '../SellerComponents/ViewPost';
import AddSellerPostPage from '../SellerComponents/Seller/AddSellerPostPage';
import { deleteSellerPost, editSellerPost, getSellerFull } from '../../../../../BackendIntegration/AxiosConnections/SellerAxios';

export default function SellerDashboard() {
  const {
    sellerPosts,
    setSellerPosts,
    sellerProfile,
    setSellerProfile
  } = useSellerState();

  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adding, setAdding] = useState(false);

const currentCategory = Array.isArray(sellerPosts) ? sellerPosts : [];
const safeIndex = activeLinkIndex < currentCategory.length ? activeLinkIndex : 0;
const activeLink = currentCategory[safeIndex] || { items: [] };
const activeGroupId = activeLink?.id || 'default-post-group';

  const refreshSellerData = async () => {
    try {
      const updated = await getSellerFull(sellerProfile.sellerId);
      setSellerPosts(updated.sellerPosts);
      setSellerProfile(prev => ({ ...prev, ...updated }));
    } catch (err) {
      console.error('❌ Failed to refresh seller data:', err);
    }
  };

  const handleItemClick = (item) => setSelectedItem(item);

  const handleGoBack = () => setSelectedItem(null);

  const renderAddPage = () => (
    <AddSellerPostPage
      goBack={() => setAdding(false)}
      onAddItem={async () => {
        await refreshSellerData();
        setAdding(false);
      }}
      sellerId={sellerProfile?.sellerId}
      postGroupId={activeGroupId}
    />
  );

  if (adding) return renderAddPage();

  if (selectedItem) {
    return (
      <ViewPost
        item={selectedItem}
        goBack={handleGoBack}
        onDelete={async () => {
          try {
            await deleteSellerPost(sellerProfile?.sellerId, activeGroupId, selectedItem.id);
            await refreshSellerData();
            setSelectedItem(null);
          } catch (err) {
            console.error('❌ Failed to delete post:', err);
          }
        }}
        onUpdate={async (updated) => {
          try {
            await editSellerPost(sellerProfile?.sellerId, activeGroupId, updated.id, updated);
            await refreshSellerData();
            setSelectedItem(updated);
          } catch (err) {
            console.error('❌ Failed to update post:', err);
          }
        }}
      />
    );
  }

  return (
    <div className={SellerStyle.dashboardBody}>
       <h1 className="addItemsHeader">Add Posts</h1>

      <div className={SellerStyle.userContainer}>
      <LinkBar
  currentCategory={currentCategory}
  activeLinkIndex={activeLinkIndex}
  setActiveLinkIndex={setActiveLinkIndex}
  sellerId={sellerProfile?.sellerId}  // Pass sellerId here
  refresh={refreshSellerData}  // Pass refresh function as a prop
/>

        <ItemGrid
          activeLink={activeLink}
          handleItemClick={handleItemClick}
        />
        <div className={SellerStyle.addItemContainer} onClick={() => setAdding(true)}>
          <button className={SellerStyle.addItemButton}>+ Add Post</button>
        </div>
      </div>
    </div>
  );
}
