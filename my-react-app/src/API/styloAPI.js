// src/api/styloAPI.js
const BASE_URL = 'http://localhost:5033'; // change this if you're deploying online

export const sendMessageToStylo = async (sessionId, userMessage) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({ sessionId, userMessage }),
    });

    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error('Stylo API Error:', err);
    return "Oops! Something went wrong. Try again later.";
  }
};
