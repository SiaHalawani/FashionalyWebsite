// getSellerFullById.js
import axios from 'axios';

export const getSellerFull = async (sellerId) => {
  try {
    const res = await axios.get(`http://localhost:5001/getSellerFull/${sellerId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching full seller data:', err);
    throw err;
  }
};
