import React, { useState } from 'react';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement'; 
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const DynamicSellerComponent = ({ dataKey, title, ViewComponent, AddComponent, currentAddPage, setCurrentAddPage, sellerId, groupId }) => {
  const { data, setData, profileData } = useSellerState();
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);  // Track current group
  const [selectedItem, setSelectedItem] = useState(null); // To hold the selected item for viewing

  const items = data?.[dataKey] || [];
  const activeLink = items?.[activeLinkIndex] || { items: [] };

  // Handle selecting an item for viewing
  const handleItemClick = (item) => {
    setSelectedItem(item);  // Set selected item
  };

  // Handle going back to the item list
  const handleGoBack = () => {
    setSelectedItem(null);  // Reset selected item
  };

  // Handle adding an item to the current group
  const handleAddItem = (item) => {
    const newData = deepClone(data);
    newData[dataKey][activeLinkIndex].items.push(item); // Push item to selected group
    setData(newData);
    setCurrentAddPage(false); // Close add item page
  };

  // Go back to the previous page after adding an item
  const goBack = () => setCurrentAddPage(false);

  // Render Add Item page dynamically
  const renderAddPage = (Component) => {
    return (
      <Component
        goBack={goBack}
        onAddItem={handleAddItem}
        category={activeLink.title?.toLowerCase() || 'misc'} // Pass category info
        sellerData={{ ...profileData, components: data }} // Pass seller data
        sellerId={sellerId}
        groupId={groupId} // Pass the groupId for correct item assignment
      />
    );
  };

  if (currentAddPage) {
    return renderAddPage(AddComponent);  // Show Add Item Page
  }

  if (selectedItem) {
    const props = {
      item: selectedItem,
      onClose: handleGoBack,
      onDelete: () => {
        const newData = deepClone(data);
        newData[dataKey][activeLinkIndex].items = newData[dataKey][activeLinkIndex].items.filter(
          (item) => item.id !== selectedItem.id
        );
        setData(newData);
        setSelectedItem(null);
      }
    };

    return activeTab === 'items' ? <ViewItem {...props} /> : <ViewPost {...props} />;
  }

  return (
    <div className={SellerStyle.sellerContainer}>
      <div className={SellerStyle.sellerBodyPage}>
        <div className={SellerStyle.navTabs}>
          <div className={SellerStyle.activeTab}>{title}</div>
        </div>

        <div className={SellerStyle.linksBar}>
          {items.map((link, i) => (
            <div
              key={i}
              onClick={() => setActiveLinkIndex(i)} // Set active group on click
              className={SellerStyle.linkItem}
              style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
            >
              <span>{link.title}</span>
            </div>
          ))}
        </div>

        <div className={SellerStyle.tabContent}>
          <div className={SellerStyle.gridItems}>
            {activeLink.items.map((item, index) => {
              const image = item.image || item.preview || '/src/assets/fallback.png';
              return (
                <div key={index} className={SellerStyle.itemBox} onClick={() => handleItemClick(item)}>
                  <img src={image} alt={item.itemName} />
                  <p className={SellerStyle.itemLabel}><b>{item.itemName}</b></p>
                  <p className={SellerStyle.itemSub}>{item.category || item.brand || ''}</p>
                </div>
              );
            })}

            {/* Add item button */}
            <div className={SellerStyle.itemBox} onClick={() => setCurrentAddPage(true)}>
              <div className={SellerStyle.addBtn}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicSellerComponent;
