import React from 'react';
import SellerStyle from '../../../../CSS/Sellercss/SellerDashboard.module.css';
import {
  addSellerPostGroup,
  editSellerPostGroup,
  deleteSellerPostGroup,
  addSellerItemGroup,
  editSellerItemGroup,
  deleteSellerItemGroup
} from '../../../../../BackendIntegration/AxiosConnections/SellerAxios';

const LinkBar = ({
  currentCategory,
  activeLinkIndex,
  setActiveLinkIndex,
  sellerId,
  refresh,  // Pass refresh function as a prop
  groupType = 'item' // 'post' or 'item'
}) => {
  const isPost = groupType === 'post';

  // Function to handle adding a new group
  const handleAddGroup = async () => {
    const title = prompt(`Enter new ${groupType} group name:`);
    if (!title) return;
    const groupId = `${groupType}-group-${Date.now()}`;

    try {
      const fn = isPost ? addSellerPostGroup : addSellerItemGroup;
      await fn(sellerId, groupId, title);
      await refresh();  // Refresh after adding the group
    } catch (err) {
      console.error('Error adding group:', err);
      alert('Failed to add group. Check console for details.');
    }
  };

  // Function to handle editing a group
  const handleEditGroup = async (group) => {
    const title = prompt(`Edit ${groupType} group title:`, group.title);
    if (!title || title === group.title) return;

    try {
      const fn = isPost ? editSellerPostGroup : editSellerItemGroup;
      await fn(sellerId, group.id, { title });
      await refresh();  // Refresh after editing the group
    } catch (err) {
      console.error('Error editing group:', err);
      alert('Failed to edit group. Check console for details.');
    }
  };

  // Function to handle deleting a group
  const handleDeleteGroup = async (group) => {
    if (!window.confirm(`Delete ${groupType} group "${group.title}"? This cannot be undone.`)) return;

    try {
      const fn = isPost ? deleteSellerPostGroup : deleteSellerItemGroup;
      await fn(sellerId, group.id);
      await refresh();  // Refresh after deleting the group
    } catch (err) {
      console.error('Error deleting group:', err);
      alert('Failed to delete group. Check console for details.');
    }
  };

  return (
    <div className={SellerStyle.linksBar}>
      {currentCategory.map((link, i) => (
        <div
          key={`${link.title}-${i}`}
          className={SellerStyle.linkItem}
          style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
        >
          <span onClick={() => setActiveLinkIndex(i)}>{link.title}</span>

          <button onClick={() => handleEditGroup(link)} className={SellerStyle.editButton}>✏️</button>
          <button onClick={() => handleDeleteGroup(link)} className={SellerStyle.deleteButton}>🗑️</button>
        </div>
      ))}

      <div className={SellerStyle.addItemContainer}>
        <button className={SellerStyle.addItemButton} onClick={handleAddGroup}>+ Add Group</button>
      </div>
    </div>
  );
};

export default LinkBar;
