import React, { useState } from 'react';
import { useGlobalState } from '../../../../../BackendIntegration/UserData/GeneralDataManagement';
import Userstyle from '../../../../CSS/User.module.css';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const DynamicComponent = ({ dataKey, title, ViewComponent, AddComponent }) => {
  const { data, setData, profileData } = useGlobalState();
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentAddPage, setCurrentAddPage] = useState(false); // Track if AddItem form is active

  const items = data?.[dataKey] || [];  // Fetch data dynamically based on the key passed
  const activeLink = items?.[activeLinkIndex] || { items: [] };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set selected item
  };

  // Handle deleting a link (category)
  const handleDeleteLink = (index) => {
    if (items.length <= 1) return; // Prevent deletion if there's only one link
    const newData = deepClone(data);
    newData[dataKey] = newData[dataKey].filter((_, i) => i !== index);
    setData(newData);
    setActiveLinkIndex(0); // Reset to the first link in the list
  };

  // Handle adding a new item to the active link
  const handleAddItem = (item) => {
    const newData = deepClone(data);
    newData[dataKey][activeLinkIndex].items.push(item);
    setData(newData);
    setCurrentAddPage(false); // Hide the Add Item form
  };

  // Go back to the item list from Add Item page
  const goBack = () => setCurrentAddPage(false);

  // Dynamically render AddItem page (e.g., AddPost)
  const renderAddPage = (Component) => {
    return (
      <Component
        goBack={goBack}  // Go back to the item list
        onAddItem={handleAddItem}  // Handle item addition
        category={activeLink.title?.toLowerCase() || 'misc'}
        userData={{ ...profileData, components: data }}  // Pass user data
        activeLink={activeLink} // Pass activeLink here
      />
    );
  };
  

  // If Add Item page is active, render the AddComponent (e.g., AddPost)
  if (currentAddPage) {
    return renderAddPage(AddComponent);
  }

  // If an item is selected, show the corresponding ViewComponent page
  if (selectedItem) {
    return (
      <ViewComponent
        item={selectedItem}
        goBack={() => setSelectedItem(null)}  // Go back to the item list
        onDelete={() => {
          const newData = deepClone(data);
          newData[dataKey][activeLinkIndex].items = newData[dataKey][activeLinkIndex].items.filter(
            (item) => item.id !== selectedItem.id
          );
          setData(newData);
          setSelectedItem(null); // Reset selected item
        }}
        onUpdate={(updatedItem) => {
          const newData = deepClone(data);
          newData[dataKey][activeLinkIndex].items = newData[dataKey][activeLinkIndex].items.map((item) =>
            item.id === selectedItem.id ? updatedItem : item
          );
          setData(newData);
          setSelectedItem(updatedItem); // Set updated item
        }}
      />
    );
  }

  return (
    <div className={Userstyle.userContainer}>
      <div className={Userstyle.userbodypage}>
        <div className={Userstyle.navTabs}>
          <div className={Userstyle.activeTab}>{title}</div>
        </div>

        <div className={Userstyle.linksBar}>
          {items.map((link, i) => (
            <div
              key={i}
              onClick={() => setActiveLinkIndex(i)}
              className={Userstyle.linkItem}
              style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
            >
              <span>{link.title}</span>
           
            </div>
          ))}
        </div>

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {activeLink.items.map((item, index) => {
              const image = item.image || item.preview || '/src/assets/fallback.png';
              return (
                <div key={index} className={Userstyle.itemBox} onClick={() => handleItemClick(item)}>
                  <img src={image} alt={item.itemName} />
                  <p className={Userstyle.itemLabel}><b>{item.itemName}</b></p>
                  <p className={Userstyle.itemSub}>{item.category || item.brand || ''}</p>
                </div>
              );
            })}

            {/* Add item button placed below the grid of items */}
            <div className={Userstyle.itemBox} onClick={() => setCurrentAddPage(true)}>
              <div className={Userstyle.addBtn}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicComponent;
