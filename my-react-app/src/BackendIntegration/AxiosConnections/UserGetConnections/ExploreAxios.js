// BackendIntegration/AxiosConnections/Explore/getExploreData.js
import axios from 'axios';

export const getExploreData = async (filterQuery = '') => {
  try {
    const response = await axios.get(`http://localhost:5077/explore${filterQuery ? `?${filterQuery}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching explore data:', error);
    return [];
  }
};


export const getWardrobeFeed = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:5005/api/wardrobe-items/feed', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error fetching wardrobe feed:', error.response?.data || error.message);
    return null;
  }
};




export const globalSearch = async (query) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
      `http://localhost:5005/api/users/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('🌐 Global search error:', error);
    return {
      users: [],
      items: [],
      collections: [],
      posts: [],
      outfits: []
    };
  }
};