// firestoreHelpers.js
const { db } = require("./firebase");

// ✅ Create new 1-on-1 chat room between two users
async function createChatRoom({ userA, userB }) {
  // Check if chat already exists
  const existing = await db.collection("chatmembers")
    .where("userID", "in", [userA, userB])
    .get();

  const chats = {};

  existing.docs.forEach(doc => {
    const data = doc.data();
    if (!chats[data.chatID]) chats[data.chatID] = new Set();
    chats[data.chatID].add(data.userID);
  });

  const existingChatID = Object.entries(chats).find(
    ([, members]) => members.has(userA) && members.has(userB)
  )?.[0];

  if (existingChatID) {
    return { chatID: existingChatID, alreadyExists: true };
  }

  // Create new chat
  const chatRef = await db.collection("chats").add({
    createdBy: userA,
    createdAt: new Date()
  });

  // Add both users
  await db.collection("chatmembers").add({ chatID: chatRef.id, userID: userA, joinedAt: new Date() });
  await db.collection("chatmembers").add({ chatID: chatRef.id, userID: userB, joinedAt: new Date() });

  return { chatID: chatRef.id, alreadyExists: false };
}

// ✅ Get all chat rooms a user is part of
async function getChatsForUser(userID) {
  const snapshot = await db.collection("chatmembers")
    .where("userID", "==", userID)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ✅ Get messages in a chat (ordered by time)
async function getMessages(chatID) {
  const snapshot = await db.collection("messages")
    .where("chatID", "==", chatID)
    .orderBy("sentAt", "asc")
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ✅ Send message (supports shared wardrobeItem, outfit, post, etc.)
async function sendMessage({ chatID, senderID, messageType = 'text', messageContent = '', sharedData = null }) {
  const newMessage = {
    chatID,
    senderID,
    messageType,
    messageContent,
    sharedData: sharedData || null,
    sentAt: new Date()
  };

  await db.collection("messages").add(newMessage);
  return newMessage;
}

// ✅ Send a notification (used for new messages or app alerts)
async function sendNotification({ senderID, recipientID, notificationType, message, status = 'unread' }) {
  const newNotification = {
    senderID,
    recipientID,
    notificationType,
    message,
    status,
    createdAt: new Date()
  };

  await db.collection("notifications").add(newNotification);
  return newNotification;
}

// (Optional for future): Get all notifications for a user
async function getNotificationsForUser(userID) {
  const snapshot = await db.collection("notifications")
    .where("recipientID", "==", userID)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
  createChatRoom,
  getChatsForUser,
  getMessages,
  sendMessage,
  sendNotification,
  getNotificationsForUser
};
