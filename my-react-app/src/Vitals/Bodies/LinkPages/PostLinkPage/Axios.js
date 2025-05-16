import axios from 'axios';

// ✅ Get post by ID
export const getPostById = async (postID) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await axios.get(`http://localhost:5005/api/posts/${postID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching post:", err);
    return null;
  }
};

// ✅ Get user by ID
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
