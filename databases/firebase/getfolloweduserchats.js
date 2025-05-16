// getFollowedUserChats.js (Backend logic)
import { db } from './firebase.js'; // Import Firestore instance from the firebase.js

async function getFollowedUserChats(currentUserID) {
  // Get all the followed user IDs for the given currentUserID
  const followsSnap = await db.collection("follows")
    .where("followerID", "==", currentUserID)
    .get();

  const followedUserIDs = followsSnap.docs.map(doc => doc.data().followedID);

  // Get all chat rooms that the currentUserID is part of
  const membershipsSnap = await db.collection("chatmembers")
    .where("userID", "==", currentUserID)
    .get();

  const validChatIDs = [];

  // Iterate through each chat and check if the other member is a followed user
  for (const doc of membershipsSnap.docs) {
    const chatID = doc.data().chatID;

    // Get all members in the current chat
    const otherMembersSnap = await db.collection("chatmembers")
      .where("chatID", "==", chatID)
      .get();

    const memberIDs = otherMembersSnap.docs.map(m => m.data().userID);
    const otherUserID = memberIDs.find(id => id !== currentUserID);

    // If the other user is followed, add this chatID to the list
    if (followedUserIDs.includes(otherUserID)) {
      validChatIDs.push(chatID);
    }
  }

  return validChatIDs; // Return the list of valid chat IDs
}

// Export the function for use in other files
export { getFollowedUserChats };
