import React, { useState } from 'react';
import styles from '../../../../../../CSS/PokeStyles.module.css'; // Adjust path if needed

export default function NamePromptModal({ onConfirm, onCancel }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm(name.trim());
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalLarge}>
        <h2 className={styles.modalTitle}> Name Your Outfit</h2>
        <p className={styles.modalSubtitle}>Give your new look a cool name!</p>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Cozy Winter Fit"
          className={styles.modalInput}
        />

        <div className={styles.modalButtonGroup}>
          <button onClick={onCancel} className={styles.button}>Cancel</button>
          <button onClick={handleSubmit} className={styles.button}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
