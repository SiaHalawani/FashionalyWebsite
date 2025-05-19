// import React, { useState, useEffect, useRef } from 'react';
// import { sendMessageToStylo } from '../../../../../../API/styloAPI';
// import styles from '../../../../../CSS/styloPopup.module.css';

// export default function StyloChatPopup({
//   onClose,
//   onFiltersReady,
//   onWeightsReady,
//   sessionId = "user-001"
// }) {
//   const defaultWeights = {
//     gender: 1,
//     season: 1.5,
//     occasion: 4,
//     temperature_range: 3,
//     price: 2,
//     brand: 3,
//     color: 6,
//     material: 4,
//     type: 4,
//     metadataBonus: 0.8,
//     harmonyBonus: 2.5,
//     vibeBonus: 4
//   };

//   const [conversation, setConversation] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isMinimized, setIsMinimized] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [filters, setFilters] = useState({});
//   const [weights, setWeights] = useState(defaultWeights);
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation, isTyping]);

//   const handleSend = async () => {
//     if (!userInput.trim()) return;

//     const userMessage = userInput;
//     setConversation(prev => [...prev, { sender: "You", message: userMessage }]);
//     setUserInput('');
//     setIsTyping(true);

//     const reply = await sendMessageToStylo(sessionId, userMessage);
//     console.log("AI full reply received:", reply);
//     await simulateTyping("Stylo", reply);

//     setIsTyping(false);
//   };

//   const simulateTyping = async (sender, fullMessage) => {
//     const jsonStart = fullMessage.indexOf('{');
//     const jsonEnd = fullMessage.lastIndexOf('}');
//     let visibleMessage = fullMessage;
//     let parsedFilters = null;
//     let parsedWeights = null;
  
//     // 💡 Try to find a "filters": or "weights": if no full braces
//     const fallbackStart = fullMessage.indexOf('"filters":');
//     const fallbackAltStart = fullMessage.indexOf('"weights":');
//     const hasPartialJSON = fallbackStart !== -1 || fallbackAltStart !== -1;
  
//     try {
//       let jsonString = null;
  
//       if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
//         // Normal valid JSON
//         jsonString = fullMessage.slice(jsonStart, jsonEnd + 1);
//         visibleMessage = fullMessage.slice(0, jsonStart).trim();
//       } else if (hasPartialJSON) {
//         // Fix broken Stylo format like: JSON: "filters": {...}, "weights": {...}
//         const jsonStartIndex = fullMessage.indexOf('"filters":') !== -1
//           ? fullMessage.indexOf('"filters":')
//           : fullMessage.indexOf('"weights":');
//         jsonString = `{${fullMessage.slice(jsonStartIndex).trim()}}`;
//         visibleMessage = fullMessage.slice(0, jsonStartIndex).replace('JSON:', '').trim();
//       }
  
//       if (jsonString) {
//         const parsedJson = JSON.parse(jsonString);
//         console.log("🧠 Parsed JSON from Stylo:", JSON.stringify(parsedJson, null, 2));
  
//         if (parsedJson.filters) {
//           parsedFilters = { ...filters, ...parsedJson.filters };
//           setFilters(parsedFilters);
//           console.log("✅ Updated Filters:", JSON.stringify(parsedFilters, null, 2));
//           onFiltersReady?.(parsedFilters);
//         }
  
//         if (parsedJson.weights) {
//           parsedWeights = { ...weights, ...parsedJson.weights };
//           const merged = { ...defaultWeights, ...parsedWeights };
//           setWeights(merged);
//           console.log("🎯 Updated Weights:", JSON.stringify(merged, null, 2));
//           onWeightsReady?.(merged);
//         }
//       }
  
//     } catch (err) {
//       console.warn("❌ Failed to parse JSON from Stylo:", err);
//     }
  
//     // ✨ Animate the visible chat message only
//     const words = visibleMessage.split(' ');
//     let currentMessage = '';
//     setConversation(prev => [...prev, { sender, message: '' }]);
  
//     for (let i = 0; i < words.length; i++) {
//       currentMessage += words[i] + ' ';
//       setConversation(prev => {
//         const updated = [...prev];
//         updated[updated.length - 1] = { sender, message: currentMessage.trim() };
//         return updated;
//       });
//       await new Promise(res => setTimeout(res, 40));
//     }
//   };
  
  
  

//   return (
//     <div className={styles.chatContainer}>
//       {isMinimized ? (
//         <button className={styles.fab} onClick={() => setIsMinimized(false)}>💬</button>
//       ) : (
//         <div className={styles.chatBox}>
//           <div className={styles.chatHeader}>
//             <span>😎 Stylo - Your AI Stylist</span>
//             <div className={styles.headerActions}>
//               <button onClick={() => setIsMinimized(true)}>—</button>
//             </div>
//           </div>

//           <div className={styles.chatBody}>
//             {conversation.map((msg, i) => (
//               <div key={i} className={msg.sender === "You" ? styles.userMsg : styles.aiMsg}>
//                 <span>{msg.message}</span>
//               </div>
//             ))}
//             {isTyping && (
//               <div className={styles.typingIndicator}>
//                 <span className={styles.dot}></span>
//                 <span className={styles.dot}></span>
//                 <span className={styles.dot}></span>
//               </div>
//             )}
//             <div ref={chatEndRef}></div>
//           </div>

//           <div className={styles.chatInput}>
//             <input
//               value={userInput}
//               onChange={e => setUserInput(e.target.value)}
//               placeholder="Type your fashion needs..."
//               disabled={isTyping}
//               onKeyDown={e => e.key === 'Enter' && handleSend()}
//             />
//             <button onClick={handleSend} disabled={isTyping}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToStylo, sendMessageToCasualStylo } from '../../../../../../API/styloAPI';
import styles from '../../../../../CSS/styloPopup.module.css';

export default function StyloChatPopup({
  onClose,
  onFiltersReady,
  onWeightsReady,
  sessionId = "user-001"
}) {
  const defaultWeights = {
    gender: 1, season: 1.5, occasion: 4, temperature_range: 3,
    price: 2, brand: 3, color: 6, material: 4,
    type: 4, metadataBonus: 0.8, harmonyBonus: 2.5, vibeBonus: 4
  };

  const [conversation, setConversation] = useState(() => {
    const saved = localStorage.getItem(`chat-${sessionId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [userInput, setUserInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [filters, setFilters] = useState({});
  const [weights, setWeights] = useState(defaultWeights);
  const [mode, setMode] = useState("stylist");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isTyping]);

  useEffect(() => {
    localStorage.setItem(`chat-${sessionId}`, JSON.stringify(conversation));
  }, [conversation, sessionId]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const userMessage = userInput;
    setConversation(prev => [...prev, { sender: "You", message: userMessage }]);
    setUserInput('');
    setIsTyping(true);

    const sendFunc = mode === "stylist" ? sendMessageToStylo : sendMessageToCasualStylo;
    const reply = await sendFunc(sessionId, userMessage);
    await handleReply("Stylo", reply);
    setIsTyping(false);
  };

  const handleReply = async (sender, fullMessage) => {
    const jsonStart = fullMessage.indexOf('{');
    const jsonEnd = fullMessage.lastIndexOf('}');
    let visibleMessage = fullMessage;
    let parsedFilters = null, parsedWeights = null;

    try {
      let jsonString = null;
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonString = fullMessage.slice(jsonStart, jsonEnd + 1);
        visibleMessage = fullMessage.slice(0, jsonStart).trim();
      }
      if (jsonString) {
        const parsedJson = JSON.parse(jsonString);
        if (parsedJson.filters) {
          parsedFilters = { ...filters, ...parsedJson.filters };
          setFilters(parsedFilters);
          onFiltersReady?.(parsedFilters);
        }
        if (parsedJson.weights) {
          parsedWeights = { ...weights, ...parsedJson.weights };
          const merged = { ...defaultWeights, ...parsedWeights };
          setWeights(merged);
          onWeightsReady?.(merged);
        }
      }
    } catch (err) {
      console.warn("JSON parse failed:", err);
    }

    const words = visibleMessage.split(' ');
    let currentMessage = '';
    setConversation(prev => [...prev, { sender, message: '' }]);
    for (let i = 0; i < words.length; i++) {
      currentMessage += words[i] + ' ';
      setConversation(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender, message: currentMessage.trim() };
        return updated;
      });
      await new Promise(res => setTimeout(res, 40));
    }
  };

  return (
    <div className={styles.chatContainer}>
      {isMinimized ? (
        <button className={styles.fab} onClick={() => setIsMinimized(false)}>💬</button>
      ) : (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <span>Stylo</span>
            <div className={styles.modeToggle}>
              <input
                type="checkbox"
                id="aiSwitch"
                className={styles.toggleCheckbox}
                checked={mode === 'casual'}
                onChange={() => setMode(mode === 'casual' ? 'stylist' : 'casual')}
              />
              <label htmlFor="aiSwitch" className={styles.toggleLabel}>
                <span className={styles.toggleText}>
                  {mode === 'casual' ? 'Chat AI' : 'Stylist AI'}
                </span>
              </label>
            </div>
            <div className={styles.headerActions}>
              <button onClick={() => setIsMinimized(true)}>—</button>
            </div>
          </div>

          <div className={styles.chatBody}>
          {conversation.map((msg, i) => (
  <div
    key={i}
    className={msg.sender === "You" ? styles.userWrapper : styles.aiWrapper}
  >
    <div className={msg.sender === "You" ? styles.userMsg : styles.aiMsg}>
      <span>{msg.message}</span>
    </div>
  </div>
))}

            {isTyping && (
              <div className={styles.typingIndicator}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          <div className={styles.chatInput}>
            <input
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Talk to Stylo..."
              disabled={isTyping}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={isTyping}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
