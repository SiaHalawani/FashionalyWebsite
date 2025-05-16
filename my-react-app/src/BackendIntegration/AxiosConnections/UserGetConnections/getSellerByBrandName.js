// getSellerByBrandName.js
import axios from 'axios';

export const getSellerByBrandName = async (brandName) => {
  try {
    const res = await axios.get(`http://localhost:5001/getSellerByBrand/${brandName}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching seller by brand name:', err);
    throw err;
  }
};
