// setupFirestore.js
const { db } = require("./firebase");

async function setupFirestore() {
  await createChats();
  await createChatMembers();
  await createMessages();
  await createNotifications();
  console.log("🎉 Firestore chat & notifications setup completed.");
}

// 1. CHATS
const chats = [
  { chatID: "chat1", chatType: "private", createdAt: new Date() },
];

async function createChats() {
  for (const chat of chats) {
    await db.collection("chats").doc(chat.chatID).set(chat);
  }
  console.log("✅ Chats added");
}

// 2. CHAT MEMBERS
const chatMembers = [
  { chatID: "chat1", userID: "user1", joinedAt: new Date() },
  { chatID: "chat1", userID: "user2", joinedAt: new Date() },
];

async function createChatMembers() {
  for (const member of chatMembers) {
    const docID = `${member.chatID}_${member.userID}`;
    await db.collection("chatmembers").doc(docID).set(member);
  }
  console.log("✅ Chat members added");
}

// 3. MESSAGES
const messages = [
  {
    chatID: "chat1",
    senderID: "user1",
    messageContent: "Hello Sara!",
    messageType: "text",
    sentAt: new Date(),
  },
  {
    chatID: "chat1",
    senderID: "user2",
    messageContent: "Hey Omar!",
    messageType: "text",
    sentAt: new Date(),
  },
];

async function createMessages() {
  for (const msg of messages) {
    await db.collection("messages").add(msg);
  }
  console.log("✅ Messages added");
}

// 4. NOTIFICATIONS
const notifications = [
  {
    senderID: "user1",
    recipientID: "user2",
    notificationType: "message",
    message: "You received a new message from Omar",
    status: "unread",
    createdAt: new Date(),
  },
];

async function createNotifications() {
  for (const notif of notifications) {
    await db.collection("notifications").add(notif);
  }
  console.log("✅ Notifications added");
}

// Run the setup
setupFirestore().catch((err) => console.error("❌ Setup failed:", err));
