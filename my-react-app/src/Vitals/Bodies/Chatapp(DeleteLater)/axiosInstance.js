// axiosInstance.js
import axios from 'axios';

const PROJECT_ID = 'project00-7b9be';
const API_KEY = 'AIzaSyADuEXrDTvO_ill2KzoR61W1dnzR2NFKCU';
const DATABASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

let currentUserId = '1';

export const setUserId = (id) => {
  currentUserId = id;
};

const axiosInstance = axios.create({
  baseURL: DATABASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: API_KEY,
  },
});

export const sendMessage = async (message) => {
  const payload = {
    fields: {
      text: { stringValue: message },
      senderId: { stringValue: currentUserId },
      timestamp: { timestampValue: new Date().toISOString() },
    },
  };
  return axiosInstance.post('/messages', payload);
};

export const getMessages = async () => {
  const res = await axiosInstance.get('/messages');
  return res.data.documents?.map(doc => ({
    id: doc.name.split('/').pop(),
    text: doc.fields.text.stringValue,
    senderId: doc.fields.senderId.stringValue,
    timestamp: doc.fields.timestamp.timestampValue,
  })) || [];
};