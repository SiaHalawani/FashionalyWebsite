import React from 'react';
import DynamicComponent from './DynamicComponent'; // Import the reusable component
import ViewCollection from '../MainComponents/User/ViewCollection';
import AddCollection from '../MainComponents/User/AddCollection';

const Collection = () => {
  return (
    <DynamicComponent
      dataKey="collections" // Fetch collections data
      title="Collections"
      ViewComponent={ViewCollection} // Pass the specific view component for collections
      AddComponent={AddCollection}  // Pass the specific add component for collections
    />
  );
};

export default Collection;
