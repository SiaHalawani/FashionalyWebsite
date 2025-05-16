import React from 'react';
import styles from '../../../../CSS/PokeStyles.module.css';

export default function ViewItem({ item, goBack, onDelete }) {
  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>{item.itemname || 'Item Details'}</h2>
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '12px',
          backgroundImage: `url(${item.image || '/src/assets/fallback.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid var(--background-color-btn)',
        }}
      />
      <div className={styles.sliderGrid}>
        {[
          ['Category', item.category],
          ['Type', item.type],
          ['Color', item.color],
          ['Brand', item.brand],
          ['Material', item.material],
          ['Season', item.season],
          ['Gender', item.gender],
          ['Occasion', item.occasion],
          ['Price', `$${item.price || 0}`],
          ['Temperature Range', `${item.temperature_range?.[0] ?? '-'}°C to ${item.temperature_range?.[1] ?? '-'}`],
          ['Essential', item.essential ? 'Yes' : 'No'],
        ].map(([label, value], i) => (
          <div className={styles.sliderGroup} key={i}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value || '-'}</span>
          </div>
        ))}
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={goBack}>Back</button>
      </div>
    </div>
  );
}
