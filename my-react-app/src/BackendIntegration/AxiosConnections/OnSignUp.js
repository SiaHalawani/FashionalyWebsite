import axios from 'axios';

export const addBulkCategories = async (userID) => {
  // Prepare the categories, replacing the hardcoded '4' with the dynamic userID
  const categories = [
    { "categoryName": "hats", "wardrobeID": userID },
    { "categoryName": "shirt", "wardrobeID": userID },
    { "categoryName": "jacket", "wardrobeID": userID },
    { "categoryName": "pants", "wardrobeID": userID },
    { "categoryName": "shoes", "wardrobeID": userID },
    { "categoryName": "other", "wardrobeID": userID }
  ];

  const token = localStorage.getItem('token'); // Get the token from localStorage

  try {
    const response = await axios.post('http://localhost:5005/api/categories/bulk-category', categories, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });

    // Handle the response
    if (response.status === 200 || response.status === 201) {
      console.log('Categories added successfully:', response.data);
    } else {
      console.error('Failed to add categories, unexpected status:', response.status);
    }
  } catch (error) {
    console.error('Error adding categories:', error.response ? error.response.data : error);
  }
};



export const createDefaultCollection = async (token) => {
  try {
    const response = await axios.post(
      'http://localhost:5005/api/collections',
      { collectionName: 'Default Collection' },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating default collection:', error.response?.data || error.message);
    return null;
  }
};