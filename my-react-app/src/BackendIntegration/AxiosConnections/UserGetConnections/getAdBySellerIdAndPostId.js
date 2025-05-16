// getPostById.js
import axios from 'axios';

export const getPostById = async (sellerId, postId) => {
  try {
    const res = await axios.get(`http://localhost:5001/getPostById/${sellerId}/${postId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching post by ID:', err);
    throw err;
  }
};
