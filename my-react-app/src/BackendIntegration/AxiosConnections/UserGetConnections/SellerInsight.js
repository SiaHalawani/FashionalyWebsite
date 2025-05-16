import axios from 'axios';

export const getClickSummary = async (postId, sellerId) => {
  try {
    const res = await axios.get(`http://localhost:5078/click-summary/${postId}`, {
      params: { sellerId }
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching click summary:', err);
    return null;
  }
};

export const getExplorePosts = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:5078/explore-posts`, {
      params: { userId }
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching explore posts:', err);
    return [];
  }
};

export const getSellerFull = async (sellerId) => {
  try {
    const res = await axios.get(`http://localhost:5001/getSellerFull/${sellerId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching seller full data:', err);
    return null;
  }
};
