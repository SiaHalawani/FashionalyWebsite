import { useState } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';

export default function AddLink({ goBack, onAdd, currentTab }) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    const newLink = {
      id: Date.now(),
      title: title || 'Untitled Link',
      items: [],
    };
    onAdd(newLink);
    goBack();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Add New Link to {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
      </h2>

      <input
        className={styles.input}
        id="linkTitleInput"
        placeholder="Link Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className={styles.buttonRow}>
        <button onClick={goBack} className={styles.cancelBtn}>Cancel</button>
        <button onClick={handleAdd} className={styles.addBtn}>Add Link</button>
      </div>
    </div>
  );
}
