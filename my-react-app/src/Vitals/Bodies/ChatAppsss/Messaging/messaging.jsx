
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './Messaging.module.css';
// import { Copy, Smile, Trash2 } from 'lucide-react';
// import { getAllUsers } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';

// export default function MessagingInterface({ userId, chatWithId, currentUser }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [matchedUser, setMatchedUser] = useState(null);

//   useEffect(() => {
//     if (!chatWithId) return;
//     const fetchMessages = async () => {
//       const res = await axios.get(`http://localhost:5000/getMessages/${userId}/${chatWithId}`);
//       const sorted = res.data.sort((a, b) =>
//         new Date(a.timestamp._seconds * 1000) - new Date(b.timestamp._seconds * 1000)
//       );
//       setMessages(sorted);
//     };
//     fetchMessages();
//   }, [userId, chatWithId]);

//   useEffect(() => {
//     const fetchMatchedUser = async () => {
//       const allUsers = await getAllUsers();
//       const match = allUsers.find(user => String(user.userID) === String(chatWithId));
//       setMatchedUser(match);
//     };
//     fetchMatchedUser();
//   }, [chatWithId]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     await axios.post(`http://localhost:5000/sendMessage`, {
//       senderId: userId,
//       recipientId: chatWithId,
//       text: input
//     });
//     setInput('');
//     const res = await axios.get(`http://localhost:5000/getMessages/${userId}/${chatWithId}`);
//     const sorted = res.data.sort((a, b) =>
//       new Date(a.timestamp._seconds * 1000) - new Date(b.timestamp._seconds * 1000)
//     );
//     setMessages(sorted);
//   };

//   const handleDeleteMessage = async (msgId) => {
//     await axios.put(`http://localhost:5000/deleteMessage/${msgId}`);
//     const res = await axios.get(`http://localhost:5000/getMessages/${userId}/${chatWithId}`);
//     const sorted = res.data.sort((a, b) =>
//       new Date(a.timestamp._seconds * 1000) - new Date(b.timestamp._seconds * 1000)
//     );
//     setMessages(sorted);
//   };

//   const handleCopy = (text) => navigator.clipboard.writeText(text);
//   const handleReact = (msgId) => alert("✨ Emoji reactions coming soon for: " + msgId);

//   return (
//     <div className={styles.container}>
//       {matchedUser && (
//         <div className={styles.chatHeader}>
//           <img src={matchedUser.profilePicture} className={styles.profilePic} alt="user" />
//           <div className={styles.chatUserInfo}>
//             <div className={styles.chatUsername}>{matchedUser.username}</div>
//             <div className={styles.chatLocation}>{matchedUser.email}</div>
//             <div className={styles.chatLocation}>{matchedUser.phone}</div>
//             <div className={styles.chatLocation}>Last seen {Math.floor(Math.random() * 12) + 12}h ago</div>
//           </div>
//         </div>
//       )}

//       <div className={styles.messages}>
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`${styles.message} ${msg.senderId === userId ? styles.incoming : styles.outgoing}`}
//           >
//             <div className={styles.messageWrapper}>
//               {msg.deletedAt ? (
//                 <div className={styles.deletedMessage}>
//                   <em>Message deleted</em>
//                 </div>
//               ) : (
//                 <>
//                   <div className={styles.bubble} unselectable="on">{msg.text}</div>
//                   <div className={styles.hoverActions}>
//                     <Copy size={18} onClick={() => handleCopy(msg.text)} className={styles.actionBtn} />
//                     <Smile size={18} onClick={() => handleReact(msg.id)} className={styles.actionBtn} />
//                     {msg.senderId === userId && (
//                       <Trash2 size={18} onClick={() => handleDeleteMessage(msg.id)} className={styles.actionBtn} />
//                     )}
//                   </div>
//                 </>
//               )}
//               <div className={styles.timestamp}>
//                 {new Date(msg.timestamp._seconds * 1000).toLocaleTimeString([], {
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles.inputArea}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           placeholder="Type a message..."
//           className={styles.input}
//         />
//         <button onClick={handleSend} className={styles.sendBtn}>Send</button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Messaging.module.css';
import { Copy, Smile, Trash2 } from 'lucide-react';
import { getAllUsers } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import fallbackPic from '../../../../../public/fallback.webp'; // adjust the path as needed
export default function MessagingInterface({ userId, chatWithId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [matchedUser, setMatchedUser] = useState(null);
  const [reactions, setReactions] = useState({});
  const [popupMessageId, setPopupMessageId] = useState(null);
  const popupRef = useRef(null);

  const emojiOptions = ['❤️', '😂', '😮', '😢', '👍', '🔥'];

  useEffect(() => {
    if (!chatWithId) return;
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:5000/getMessages/${userId}/${chatWithId}`);
      const sorted = res.data.sort(
        (a, b) => new Date(a.timestamp._seconds * 1000) - new Date(b.timestamp._seconds * 1000)
      );
      setMessages(sorted);
    };
    fetchMessages();
  }, [userId, chatWithId]);

  useEffect(() => {
    const fetchMatchedUser = async () => {
      const allUsers = await getAllUsers();
      const match = allUsers.find(user => String(user.userID) === String(chatWithId));
      setMatchedUser(match);
    };
    fetchMatchedUser();
  }, [chatWithId]);

  // Close emoji popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupMessageId(null);
      }
    }
    if (popupMessageId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupMessageId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await axios.post(`http://localhost:5000/sendMessage`, {
      senderId: userId,
      recipientId: chatWithId,
      text: input,
    });
    setInput('');
    const res = await axios.get(`http://localhost:5000/getMessages/${userId}/${chatWithId}`);
    const sorted = res.data.sort(
      (a, b) => new Date(a.timestamp._seconds * 1000) - new Date(b.timestamp._seconds * 1000)
    );
    setMessages(sorted);
  };

  const handleDeleteMessage = async msgId => {
    await axios.put(`http://localhost:5000/deleteMessage/${msgId}`);
    const res = await axios.get(`http://localhost:5000/getMessages/${userId}/${chatWithId}`);
    const sorted = res.data.sort(
      (a, b) => new Date(a.timestamp._seconds * 1000) - new Date(b.timestamp._seconds * 1000)
    );
    setMessages(sorted);
  };

  const handleCopy = text => navigator.clipboard.writeText(text);

  const toggleEmojiPopup = msgId => {
    // toggle popup open/close
    setPopupMessageId(popupMessageId === msgId ? null : msgId);
  };

  const selectEmoji = (msgId, emoji) => {
    // if clicked emoji is same as current reaction => remove reaction
    if (reactions[msgId] === emoji) {
      setReactions(prev => {
        const copy = { ...prev };
        delete copy[msgId];
        return copy;
      });
    } else {
      setReactions(prev => ({ ...prev, [msgId]: emoji }));
    }
    setPopupMessageId(null);
  };

  return (
    <div className={styles.container}>
      {matchedUser && (
        <div className={styles.chatHeader}>
         <img
  src={matchedUser.profilePicture || fallbackPic}
  className={styles.profilePic}
  alt="user"
/>

          <div className={styles.chatUserInfo}>
            <div className={styles.chatUsername}>{matchedUser.username}</div>
            <div className={styles.chatLocation}>{matchedUser.email}</div>
            <div className={styles.chatLocation}>{matchedUser.phone}</div>
            <div className={styles.chatLocation}>
              Last seen {Math.floor(Math.random() * 12) + 12}h ago
            </div>
          </div>
        </div>
      )}

      <div className={styles.messages}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.senderId === userId ? styles.incoming : styles.outgoing
            }`}
          >
            <div className={styles.messageWrapper}>
              {msg.deletedAt ? (
                <div className={styles.deletedMessage}>
                  <em>Message deleted</em>
                </div>
              ) : (
                <>
                  <div className={styles.bubble}>{msg.text}</div>

                  {reactions[msg.id] && (
                    <div className={styles.reactionDisplay}>{reactions[msg.id]}</div>
                  )}

                  <div className={styles.hoverActions}>
                    <Copy
                      size={18}
                      onClick={() => handleCopy(msg.text)}
                      className={styles.actionBtn}
                    />
                    <Smile
                      size={18}
                      onClick={() => toggleEmojiPopup(msg.id)}
                      className={styles.actionBtn}
                    />
                    {msg.senderId === userId && (
                      <Trash2
                        size={18}
                        onClick={() => handleDeleteMessage(msg.id)}
                        className={styles.actionBtn}
                      />
                    )}
                  </div>

                  {popupMessageId === msg.id && (
                    <div ref={popupRef} className={styles.emojiPopup}>
                      {emojiOptions.map(emoji => (
                        <span
                          key={emoji}
                          onClick={() => selectEmoji(msg.id, emoji)}
                          className={styles.emojiChoice}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className={styles.timestamp}>
                {new Date(msg.timestamp._seconds * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}
