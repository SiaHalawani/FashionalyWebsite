import axios from 'axios';

export const getWardrobeItemsByWardrobeId = async (wardrobeID) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:5005/api/wardrobe-items?wardrobeID=${wardrobeID}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createOutfit = async (outfitName, imageUrl, selectedItemIDs) => {
  const token = localStorage.getItem('token');
  const payload = {
    outfitName,
    imageUrl,
    outfitItems: selectedItemIDs.map(id => ({ itemID: id }))
  };

  const response = await axios.post('http://localhost:5005/api/outfits', payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};



 export const getWardrobeID = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      // Check if token exists
      if (!token) {
        console.error('No authentication token found.');
        return null;
      }
  
      // Make the GET request to the /api/wardrobe/all endpoint with the Bearer token
      const response = await axios.get('http://localhost:5005/api/wardrobe', {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
      });
  
      // Check if the response contains any wardrobe data
      if (response.data && response.data.length > 0) {
        // Return the wardrobeID of the first item in the array
        return response.data[0].wardrobeID;
      } else {
        console.warn('No wardrobes found in the response.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching wardrobe data:', error);
      return null;
    }
  };
  

export const updateOutfit = async (outfitID, outfitName, itemIDs) => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      outfitName,
      outfitItems: itemIDs.map(id => ({ itemID: id })),
    };

    const response = await axios.put(`http://localhost:5005/api/outfits/${outfitID}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating outfit:', error.response?.data || error.message);
    return null;
  }
};


export const deleteOutfit = async (outfitID) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`http://localhost:5005/api/outfits/${outfitID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting outfit:', error.response?.data || error.message);
    return null;
  }
};


export const getOutfitById = async (outfitID) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:5005/api/outfits', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const allOutfits = response.data;

    // Find the outfit with the matching outfitID
    const matchedOutfit = allOutfits.find(outfit => outfit.outfitID === outfitID);

    if (!matchedOutfit) {
      console.warn(`Outfit with ID ${outfitID} not found.`);
      return null;
    }

    return matchedOutfit;
  } catch (error) {
    console.error('Error fetching outfit by ID:', error.response?.data || error.message);
    return null;
  }
};
