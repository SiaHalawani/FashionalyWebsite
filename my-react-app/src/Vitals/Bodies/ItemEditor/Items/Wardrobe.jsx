import React from 'react';

import DynamicComponent from '../../Mainapp/routes/AppRoutes/DynamicComponent'; // Import the reusable component
import ViewWardrobeItem from '../../Mainapp/routes/MainComponents/User/ViewWardrobeItem'; // Import the specific view component for wardrobe items
import AddWardrobe from '../../Mainapp/routes/MainComponents/User/AddWardrobe';

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
