import React from 'react';
import styles from '../../../../CSS/PokeStyles.module.css';

export default function ViewPost({ item, goBack, onDelete }) {
  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>View Post</h2>
      <div
        style={{
          width: '220px',
          height: '220px',
          borderRadius: '14px',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid var(--background-color-btn)',
        }}
      />
      <div className={styles.filterGroup}>
        <div className={styles.label}>Caption</div>
        <div className={styles.value}>{item.caption}</div>
        <div className={styles.label}>Posted On</div>
        <div className={styles.value}>{new Date(item.timestamp).toLocaleString()}</div>
        <div className={styles.label}>
          Likes: {item.likes} | Comments: {item.comments}
        </div>
      </div>
      <div className={styles.buttonGroup}>

        <button className={styles.button} onClick={goBack}>Back</button>
      </div>
    </div>
  );
}
