import React from 'react';
import ViewPost from '../ViewPost'; // Correct import
import ViewItem from '../ViewItem'; // Assuming ViewItem is the new component to view seller items

const ViewItemPage = ({ currentViewPage, renderViewPage, data, setData, setCurrentViewPage, activeTab, activeLinkIndex, profileData }) => {
  if (!currentViewPage) return null;  // If no item is selected, return null.

  // Dynamically select the component based on the type of item (post, item)
  const Component = {
    'posts': ViewPost,
    'items': ViewItem, // Replaced ViewWardrobeItem with ViewItem
  }[currentViewPage];

  return renderViewPage(Component); // Renders the dynamically selected item view page
};

export default ViewItemPage;
