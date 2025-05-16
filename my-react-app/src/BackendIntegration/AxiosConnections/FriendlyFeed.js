import axios from 'axios';
export const getFeedPosts = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("⚠️ No token found in localStorage");
    return [];
  }

  try {
    const res = await axios.get('http://localhost:5005/api/posts/feed', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("📥 Feed posts:", res.data);
    return res.data || [];
  } catch (error) {
    console.error("❌ Error fetching feed posts:", error);
    return [];
  }
};