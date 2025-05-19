import React, { useState } from 'react';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';
import LinkBar from '../SellerComponents/ItemLinkBar';
import ItemGrid from '../SellerComponents/ItemGrid';
import ViewItem from '../SellerComponents/ViewItem';
import AddSellerItemPage from '../SellerComponents/Seller/AddSellerItemPage';
import { editSellerItem, getSellerFull, deleteSellerItem } from '../../../../../BackendIntegration/AxiosConnections/SellerAxios';

export default function SellerDashboard() {
  const {
    sellerComponents,
    setSellerComponents,
    sellerProfile,
    setSellerProfile
  } = useSellerState();

  const [activeTab] = useState('items');
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adding, setAdding] = useState(null);

  const currentCategory = sellerComponents;
  const activeGroupId = currentCategory?.[activeLinkIndex]?.id || 'default-group';
  const activeLink = currentCategory?.[activeLinkIndex] || { items: [] };

  
  const refreshSellerData = async () => {
    try {
      const updated = await getSellerFull(sellerProfile.sellerId);
      setSellerComponents(updated.sellerItems);
      setSellerProfile({ ...sellerProfile, ...updated });
    } catch (err) {
      console.error('❌ Failed to refresh seller data:', err);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem({ ...item, sectionIndex: activeLinkIndex });
  };

  const handleGoBack = () => setSelectedItem(null);

  const renderAddPage = (Component) => (
    <Component
      goBack={() => setAdding(null)}
      onAddItem={async () => {
        await refreshSellerData();
        setAdding(null);
      }}
      sellerData={{ components: sellerComponents }}
      category={activeLink.title?.toLowerCase() || 'misc'}
      sellerId={sellerProfile?.sellerId}
      groupId={activeGroupId}
    />
  );

  if (adding === 'item') return renderAddPage(AddSellerItemPage);

  if (selectedItem) {
    const props = {
      item: selectedItem,
      goBack: handleGoBack,
      onDelete: async () => {
        try {
          await deleteSellerItem(
            sellerProfile?.sellerId,
            activeLink.id,
            selectedItem.id
          );
          const newData = structuredClone(currentCategory);
          const groupIndex = activeLinkIndex;
          newData[groupIndex].items = newData[groupIndex].items.filter(
            (i) => i.id !== selectedItem.id
          );
          setSellerComponents(newData);
          setSelectedItem(null);
        } catch (err) {
          console.error('❌ Failed to delete item:', err);
        }
      },
      
      onUpdate: async (updated) => {
        try {
          await editSellerItem(
            sellerProfile?.sellerId,
            activeLink.id,
            updated.id,
            updated
          );
          const newData = structuredClone(currentCategory);
          const group = newData[activeLinkIndex];
          const index = group.items.findIndex((i) => i.id === updated.id);
          if (index !== -1) {
            group.items[index] = updated;
            setSellerComponents(newData);
            setSelectedItem(updated);
          }
        } catch (err) {
          console.error('Failed to update item:', err);
        }
      }
    };
    return <ViewItem {...props} />;
  }

  return (
    <div className={SellerStyle.dashboardBody}>
     <h1 className="addItemsHeader">Add Items</h1>

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
        <div
          className={SellerStyle.addItemContainer}
          onClick={() => setAdding('item')}
        >
          <button className={SellerStyle.addItemButton}>+ Add Item</button>
        </div>
      </div>
    </div>
  );
}
