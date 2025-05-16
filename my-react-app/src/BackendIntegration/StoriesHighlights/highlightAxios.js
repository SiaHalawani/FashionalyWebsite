import axios from 'axios';

const BASE_URL = 'http://localhost:5005/api/highlights';
const token = localStorage.getItem('token');

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const createHighlight = async (highlightData) => {
  return axios.post(`${BASE_URL}/`, highlightData, {
    ...authHeader,
    headers: { ...authHeader.headers, 'Content-Type': 'application/json' }
  });
};

export const addToHighlight = async (highlightID, storyID) => {
  return axios.post(`${BASE_URL}/${highlightID}/add`, { storyID }, {
    ...authHeader,
    headers: { ...authHeader.headers, 'Content-Type': 'application/json' }
  });
};

export const getUserHighlights = async (userID) => {
  return axios.get(`${BASE_URL}/user/${userID}`, authHeader);
};

export const deleteHighlight = async (highlightID) => {
  return axios.delete(`${BASE_URL}/${highlightID}`, authHeader);
};

export const editHighlight = async (highlightID, updateData) => {
  return axios.put(`${BASE_URL}/${highlightID}`, updateData, {
    ...authHeader,
    headers: { ...authHeader.headers, 'Content-Type': 'application/json' }
  });
};

export const bulkCreateHighlights = async (highlightsArray) => {
  return axios.post(`${BASE_URL}/bulk`, highlightsArray, {
    ...authHeader,
    headers: { ...authHeader.headers, 'Content-Type': 'application/json' }
  });
};