import React from 'react';
import AddPost from '../AddPost';
import AddWardrobe from '../AddWardrobe';
import AddOutfit from '../AddOutfit';
import AddCollection from '../AddCollection';

const AddItemPage = ({ currentAddPage, renderAddPage, data, setData, setCurrentAddPage, activeTab, activeLinkIndex, profileData }) => {
  if (!currentAddPage) return null;
  const Component = {
    'posts': AddPost,
    'wardrobe': AddWardrobe,
    'outfits': AddOutfit,
    'collections': AddCollection,
  }[currentAddPage];

  return renderAddPage(Component);
};

export default AddItemPage;