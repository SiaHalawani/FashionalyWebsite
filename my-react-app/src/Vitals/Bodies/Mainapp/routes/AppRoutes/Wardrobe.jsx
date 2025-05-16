import React from 'react';
import DynamicComponent from './DynamicComponent'; // Import the reusable component
import ViewWardrobeItem from '../MainComponents/User/ViewWardrobeItem';
import AddWardrobe from '../MainComponents/User/AddWardrobe';

const Wardrobe = () => {
  return (
    <DynamicComponent
      dataKey="wardrobe" // Fetch wardrobe data
      title="Wardrobe"
      ViewComponent={ViewWardrobeItem} // Pass the specific view component for wardrobe items
      AddComponent={AddWardrobe}  // Pass the specific add component for wardrobe items
    />
  );
};

export default Wardrobe;
