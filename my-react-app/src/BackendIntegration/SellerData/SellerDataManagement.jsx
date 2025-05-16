import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSellerData } from './SellerData'; // Adjust the import path accordingly

const SellerStateContext = createContext();

export const SellerProvider = ({ children, sellerId }) => {  // Accept sellerId as a prop
  const [sellerComponents, setSellerComponents] = useState([]);
  const [sellerPosts, setSellerPosts] = useState([]);
  const [sellerProfile, setSellerProfile] = useState({});

  // Fetch seller data dynamically when the component mounts
  useEffect(() => {
    const loadSellerData = async () => {
      if (sellerId) {
        const sellerData = await fetchSellerData(sellerId);  // Pass sellerId to the function
        if (sellerData.length > 0) {
          setSellerComponents(sellerData[0].sellerItems); // Set the seller items dynamically
          setSellerPosts(sellerData[0].sellerPosts); // Set the seller posts dynamically
          setSellerProfile(sellerData[0]); // Set the seller profile dynamically
        }
      }
    };

    loadSellerData();
  }, [sellerId]); // Dependency array ensures this runs whenever sellerId changes

  return (
    <SellerStateContext.Provider value={{
      sellerComponents,
      setSellerComponents,
      sellerPosts,
      setSellerPosts,
      sellerProfile,
      setSellerProfile
    }}>
      {children}
    </SellerStateContext.Provider>
  );
};

export const useSellerState = () => useContext(SellerStateContext);
