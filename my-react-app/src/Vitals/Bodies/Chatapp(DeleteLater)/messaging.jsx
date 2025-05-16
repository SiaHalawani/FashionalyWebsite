// MessagingInterface.jsx
import { useState, useEffect } from 'react'
import { sendMessage, getMessages, setUserId as updateUserId } from './axiosInstance'
import styles from './Messaging.module.css'

export default function MessagingInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [userId, setUserId] = useState('1')

  useEffect(() => {
    updateUserId(userId)
    const fetchMessages = async () => {
      const msgs = await getMessages()
      const sorted = msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      setMessages(sorted)
    }
    fetchMessages()
  }, [userId])

  const handleSend = async () => {
    if (!input.trim()) return
    await sendMessage(input)
    const msgs = await getMessages()
    const sorted = msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    setMessages(sorted)
    setInput('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label>User:</label>
        <select value={userId} onChange={(e) => {
          setUserId(e.target.value)
          updateUserId(e.target.value)
        }}>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
        </select>
      </div>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.senderId === userId ? styles.incoming : styles.outgoing
            }`}
          >
            <div className={styles.bubble}>{msg.text}</div>
            <div className={styles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
