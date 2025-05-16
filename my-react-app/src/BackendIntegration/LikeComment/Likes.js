import axios from 'axios';

const API_BASE = 'http://localhost:5005/api/likes';

export const likePost = async (postID) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await axios.post(API_BASE, { postID }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("👍 Liked post:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Error liking post:", err.response?.data || err.message);
    return null;
  }
};

export const getPostLikes = async (postID) => {
  try {
    const res = await axios.get(`${API_BASE}/count/${postID}`);
    console.log("📊 Post like count:", res.data);
    return res.data.likes;
  } catch (err) {
    console.error("❌ Error fetching like count:", err.response?.data || err.message);
    return 0;
  }
};

export const unlikePost = async (postID) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await axios.delete(`${API_BASE}/${postID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("👎 Unliked post:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Error unliking post:", err.response?.data || err.message);
    return null;
  }
};
