import { useState } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';

export default function ViewCollection({ item, goBack, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [collection, setCollection] = useState({ ...item });

  const handleChange = (e) => {
    setCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    onUpdate(collection);
  };

  // Ensure goBack doesn't break the page
  const handleGoBack = () => {
    try {
      goBack();  // Calls the goBack function passed from the parent component
    } catch (error) {
      console.error('Error while navigating back:', error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.cancelBtn}>← Back</button>
      <img
        src={collection.image}
        alt="collection"
        style={{ width: '100%', borderRadius: 8, marginTop: 16 }}
      />

      {editMode ? (
        <>
          <input
            className={styles.input}
            name="name"
            value={collection.name}
            onChange={handleChange}
            placeholder="Collection Name"
          />
          <input
            className={styles.input}
            name="category"
            value={collection.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            className={styles.input}
            name="author"
            value={collection.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <input
            className={styles.input}
            name="image"
            value={collection.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <div className={styles.buttonRow}>
            <button onClick={handleSave} className={styles.addBtn}>Save</button>
            <button onClick={() => setEditMode(false)} className={styles.cancelBtn}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.heading}>{collection.name}</h2>
          <p><b>Category:</b> {collection.category}</p>
          <p><b>Author:</b> {collection.author}</p>

          <div className={styles.buttonRow}>
            <button onClick={() => setEditMode(true)} className={styles.addBtn}>Edit</button>
          </div>
        </>
      )}

      <button onClick={onDelete} className={styles.deleteBtn} style={{ marginTop: 20 }}>
        Delete
      </button>
    </div>
  );
}