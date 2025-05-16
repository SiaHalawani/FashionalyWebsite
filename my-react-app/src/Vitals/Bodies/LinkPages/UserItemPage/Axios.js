import axios from 'axios';

export const getItemById = async (itemID) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("⚠️ No token found");
    return null;
  }

  try {
    const response = await axios.get(`http://localhost:5005/api/wardrobe-items/${itemID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("📦 Fetched item:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Error fetching item by ID:", err);
    return null;
  }
};



export const getUserById = async (userID) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("⚠️ No token for getUserById");
    return null;
  }

  try {
    const res = await axios.get(`http://localhost:5005/api/users/${userID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("👤 User fetched:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch user:", err);
    return null;
  }
};