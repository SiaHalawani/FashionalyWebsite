// src/BackendIntegration/LikeComment/Comments.js
import axios from 'axios';

const API_URL = 'http://localhost:5005/api/comments';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

// Create a comment
export const submitComment = async (postId, text) => {
  try {
    const response = await axios.post(API_URL, { postID: postId, commentText: text }, getAuthHeaders());
    console.log("✅ Comment submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error submitting comment:", error);
    return null;
  }
};

// Delete a comment by commentId
export const removeComment = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${commentId}`, getAuthHeaders());
    console.log("🗑️ Comment removed:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return null;
  }
};

// Get all comments for a specific post
export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}`, getAuthHeaders());
    console.log("💬 Comments for post:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    return [];
  }
};

// Get comment count for a post
export const fetchCommentCount = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}/count`, getAuthHeaders());
    return response.data?.count || 0;
  } catch (error) {
    console.error("❌ Error fetching comment count:", error);
    return 0;
  }
};
