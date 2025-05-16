import React from 'react';
import DynamicComponent from './DynamicComponent'; // Import the reusable component
import ViewOutfitItem from '../MainComponents/User/ViewOutfitItem';
import AddOutfit from '../MainComponents/User/AddOutfit';

const Outfit = () => {
  return (
    <DynamicComponent
      dataKey="outfits" // Fetch outfits data
      title="Outfits"
      ViewComponent={ViewOutfitItem} // Pass the specific view component for outfits
      AddComponent={AddOutfit}  // Pass the specific add component for outfits
    />
  );
};

export default Outfit;
