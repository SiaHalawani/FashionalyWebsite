// src/api/explorePostAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5078';

// GET all explore posts for a user
export const fetchExplorePosts = async (userId = 'anonymous') => {
  try {
    const response = await axios.get(`${BASE_URL}/explore-posts`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching explore posts:', error);
    throw error;
  }
};

// POST a click event for a post
export const registerPostClick = async (postId, sellerId) => {
  try {
    const response = await axios.post(`${BASE_URL}/click/${postId}`, {
      sellerId
    });
    return response.data;
  } catch (error) {
    console.error(`Error registering click for ${postId}:`, error);
    throw error;
  }
};

// GET click summary for a post
export const fetchClickSummary = async (postId, sellerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/click-summary/${postId}`, {
      params: { sellerId }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching click summary for ${postId}:`, error);
    throw error;
  }
};
