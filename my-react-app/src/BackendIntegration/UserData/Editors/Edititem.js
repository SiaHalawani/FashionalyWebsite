import axios from 'axios';

export const deleteWardrobeItem = async (itemId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(`http://localhost:5005/api/wardrobe-items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete wardrobe item:', error);
    throw error;
  }
};



export const updateWardrobeItem = async (itemId, updatedData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(`http://localhost:5005/api/wardrobe-items/${itemId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating wardrobe item:', error);
    throw error;
  }
};



export const addWardrobeItem = async (itemData, token) => {
  try {
    const response = await axios.post('http://localhost:5005/api/wardrobe-items', itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Error adding wardrobe item:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Unknown error occurred.',
    };
  }
};





export const getLastCategoryIDByWardrobeID = async (wardrobeID) => {
  console.log("🔍 Calling getLastCategoryIDByWardrobeID with wardrobeID:", wardrobeID);

  const token = localStorage.getItem('token');
  if (!token) {
    console.error("❌ No token found in localStorage.");
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:5005/api/categories/wardrobe/${wardrobeID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Axios response received:", response);

    if (response.status === 200 && Array.isArray(response.data)) {
      const categories = response.data;
      console.log("📦 Categories array received:", categories);

      const otherCategory = categories.find(cat => cat.categoryName.toLowerCase() === 'other');
      console.log("🔍 Searching for category with name 'other'...");

      if (otherCategory) {
        console.log("✅ Found 'other' category:", otherCategory);
        return otherCategory.categoryID;
      } else {
        console.warn("⚠️ 'Other' category not found in the list.");
        return null;
      }
    } else {
      console.error("❌ Unexpected response format or data:", response);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return null;
  }
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