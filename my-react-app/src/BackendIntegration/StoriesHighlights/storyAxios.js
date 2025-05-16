import axios from 'axios';

const BASE_URL = 'http://localhost:5005/api/stories';

// Dynamically get the auth header every time
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

// Create a single-resource POST
export const createStory = async (storyData) => {
  return axios.post(`${BASE_URL}/`, storyData, getAuthHeader());
};

// Get stories from followed users
export const getFollowedStories = async () => {
  return axios.get(`${BASE_URL}/following`, getAuthHeader());
};

// Get stories for a specific user
export const getUserStories = async (userID) => {
  return axios.get(`${BASE_URL}/user/${userID}`, getAuthHeader());
};

// Get the next story in a sequence
export const getNextStory = async (storyID) => {
  return axios.get(`${BASE_URL}/${storyID}/next`, getAuthHeader());
};

// Bulk-create stories
export const bulkCreateStories = async (storiesArray) => {
  return axios.post(`${BASE_URL}/bulk`, storiesArray, getAuthHeader());
};

// Delete a single story
export const deleteStory = async (storyID) => {
  return axios.delete(`${BASE_URL}/${storyID}`, getAuthHeader());
};
