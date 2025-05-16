import React from 'react';
import ViewPost from './ViewPost';
import ViewWardrobeItem from './ViewWardrobeItem';
import ViewOutfitItem from './ViewOutfitItem';
import ViewCollection from '../ViewCollection';

const ViewItemPage = ({
  currentViewPage,
  selectedItem,
  setSelectedItem,
  data,
  setData,
  activeTab,
  activeLinkIndex,
  profileData,
  renderViewPage
}) => {
  if (!currentViewPage || !selectedItem) return null;

  const Component = {
    posts: ViewPost,
    wardrobe: ViewWardrobeItem,
    outfits: ViewOutfitItem,
    collections: ViewCollection,
  }[currentViewPage];

  const itemId =
    selectedItem?.postId ||
    selectedItem?.itemID ||
    selectedItem?.outfitID ||
    selectedItem?.collectionID;

  const handleGoBack = () => setSelectedItem(null);

  const handleDelete = () => {
    const updatedItems = data[activeTab][activeLinkIndex].items.filter(item => {
      const id =
        item.postId || item.itemID || item.outfitID || item.collectionID;
      return id !== itemId;
    });

    const updatedData = [...data[activeTab]];
    updatedData[activeLinkIndex].items = updatedItems;

    setData(prev => ({
      ...prev,
      [activeTab]: updatedData
    }));

    handleGoBack();
  };

  const handleUpdate = (updatedItem) => {
    const updatedItems = data[activeTab][activeLinkIndex].items.map(item => {
      const id =
        item.postId || item.itemID || item.outfitID || item.collectionID;
      const updatedId =
        updatedItem.postId || updatedItem.itemID || updatedItem.outfitID || updatedItem.collectionID;

      return id === updatedId ? updatedItem : item;
    });

    const updatedData = [...data[activeTab]];
    updatedData[activeLinkIndex].items = updatedItems;

    setData(prev => ({
      ...prev,
      [activeTab]: updatedData
    }));

    setSelectedItem(updatedItem);
  };

  return renderViewPage(Component, {
    item: selectedItem,
    itemId,
    goBack: handleGoBack,
    onDeleteItem: handleDelete,
    onUpdateItem: handleUpdate,
    profileData
  });
};

export default ViewItemPage;
