import axios from 'axios';

export const checkIfFollowing = async (targetUserID) => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.get(`http://localhost:5005/api/followers/is-following/${targetUserID}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data?.isFollowing || false;
  } catch (err) {
    console.error("Error checking follow status:", err);
    return false;
  }
};

export const unfollowUser = async (followerID, followingID) => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.delete(`http://localhost:5005/api/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        followerID,
        followingID
      }
    });
    return res.data?.success || true;
  } catch (err) {
    console.error("Error unfollowing user:", err);
    return false;
  }
};



export const getWardrobeItemsByUser = async (userID) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("⚠️ No token found in localStorage");
    return [];
  }

  try {
    const res = await axios.get(`http://localhost:5005/api/wardrobe-items/feed/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("🧺 Wardrobe items for user", userID, "→", res.data);
    return res.data || [];
  } catch (err) {
    console.error("❗ Error fetching wardrobe items:", err);
    return [];
  }
};