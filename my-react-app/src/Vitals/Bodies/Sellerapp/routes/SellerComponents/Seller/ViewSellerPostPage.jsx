import React from 'react';
import ViewPost from '../ViewPost'; 
import ViewItem from '../ViewItem'; 

const ViewItemPage = ({ currentViewPage, renderViewPage, data, setData, setCurrentViewPage, activeTab, activeLinkIndex, profileData }) => {
  const RenderedView = currentViewPage ? renderViewPage({
    'posts': ViewPost,
    'items': ViewItem,
  }[currentViewPage]) : null;

  return (
    <>
      {renderViewPage(ViewPost)}
      {RenderedView}
    </>
  );
};

export default ViewItemPage;
