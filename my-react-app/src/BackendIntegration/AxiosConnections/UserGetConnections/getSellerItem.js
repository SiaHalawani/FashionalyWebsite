// getItemById.js
import axios from 'axios';

export const getItemById = async (sellerId, itemId) => {
  try {
    const res = await axios.get(`http://localhost:5001/getItemById/${sellerId}/${itemId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching item by ID:', err);
    throw err;
  }
};
