import express from 'express';
import cors from 'cors'; // Import CORS
import { db } from './firebase.js';  // Firebase Firestore
import bodyParser from 'body-parser';  // For parsing JSON in POST requests

const app = express();
const port = 5000;

// Enable CORS for all origins (or specify allowed origins)
app.use(cors()); // Use CORS middleware

// Middleware to parse JSON in requests
app.use(bodyParser.json());

// Endpoint to fetch messages between users based on senderId
app.get('/getMessages/:senderId', async (req, res) => { 
  const { senderId } = req.params;  
  console.log(`Fetching messages for senderId: ${senderId}`);

  try {
    const messagesSnap = await db.collection('testMessages')
      .where('senderId', '==', senderId)  // Correctly use senderId to query
      .get();

    console.log(`Number of messages found: ${messagesSnap.size}`);

    if (messagesSnap.empty) {
      console.log(`No messages found for senderId ${senderId}`);
      return res.json([]);  // Return empty array if no messages found
    }

    const messages = messagesSnap.docs.map(doc => ({
      id: doc.id,  // Include document ID for deletion
      ...doc.data(),
    }));
    console.log("Messages data:", messages);

    res.json(messages);  // Return the messages to the frontend
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch messages for a recipient
app.get('/getMessagesForRecipient/:recipientId', async (req, res) => {
    const { recipientId } = req.params;
    console.log(`Fetching messages for recipientId: ${recipientId}`);
  
    try {
      const senderMessagesSnap = await db.collection('testMessages')
        .where('senderId', '==', recipientId)
        .get();
      
      const recipientMessagesSnap = await db.collection('testMessages')
        .where('recipientId', '==', recipientId)
        .get();
  
      const senderMessages = senderMessagesSnap.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }));
      const recipientMessages = recipientMessagesSnap.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }));

      const allMessages = [...senderMessages, ...recipientMessages];
  
      if (allMessages.length === 0) {
        console.log(`No messages found for recipientId ${recipientId}`);
        return res.json([]);  // Return empty array if no messages found
      }

      console.log("All Messages data:", allMessages);
      res.json(allMessages);  // Return the combined messages to the frontend
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint to send a message
import { Timestamp } from 'firebase-admin/firestore';  // Import Timestamp from Firebase Admin SDK
app.post('/sendMessage', async (req, res) => {
  const { senderId, recipientId, text } = req.body;

  if (!senderId || !recipientId || !text) {
    return res.status(400).json({ error: 'senderId, recipientId, and text are required fields.' });
  }

  try {
    const messageData = {
      senderId: senderId,
      recipientId: recipientId,
      text: text,
      timestamp: Timestamp.now(),  
    };

    await db.collection('testMessages').add(messageData);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch messages between two users based on senderId and recipientId
app.get('/getMessages/:userId/:selectedUserId', async (req, res) => {
  const { userId, selectedUserId } = req.params;
  console.log(`Fetching messages between userId: ${userId} and selectedUserId: ${selectedUserId}`);

  try {
    const messagesSnap = await db.collection('testMessages')
      .where('senderId', 'in', [userId, selectedUserId])
      .where('recipientId', 'in', [userId, selectedUserId])
      .get();

    if (messagesSnap.empty) {
      console.log(`No messages found between userId: ${userId} and selectedUserId: ${selectedUserId}`);
      return res.json([]);  
    }

    const messages = messagesSnap.docs
      .map(doc => ({
        id: doc.id,  // Include document ID
        ...doc.data(),
      }))
      .filter(msg => 
        (msg.senderId === userId && msg.recipientId === selectedUserId) || 
        (msg.senderId === selectedUserId && msg.recipientId === userId)
      );

    res.json(messages);  
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete an entire chat log between two users
app.delete('/deleteChat/:userId/:selectedUserId', async (req, res) => {
  const { userId, selectedUserId } = req.params;

  try {
    const messagesSnap = await db.collection('testMessages')
      .where('senderId', 'in', [userId, selectedUserId])
      .where('recipientId', 'in', [userId, selectedUserId])
      .get();

    if (messagesSnap.empty) {
      return res.status(404).json({ error: 'No messages found between these users' });
    }

    messagesSnap.forEach(doc => {
      doc.ref.delete();  
    });

    res.status(200).json({ message: 'Chat log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete an individual message by messageId
app.delete('/deleteMessage/:messageId', async (req, res) => {
  const { messageId } = req.params;

  try {
    const messageRef = db.collection('testMessages').doc(messageId);
    const messageSnap = await messageRef.get();

    if (!messageSnap.exists) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await messageRef.delete();

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/deleteMessage/:messageId', async (req, res) => {
    const { messageId } = req.params;
  
    try {
      const messageRef = db.collection('testMessages').doc(messageId);
      const messageSnap = await messageRef.get();
  
      if (!messageSnap.exists) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      await messageRef.update({
        text: 'This message has been deleted',
        deletedAt: Timestamp.now(),  // Add a timestamp for when the message was deleted
      });
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
