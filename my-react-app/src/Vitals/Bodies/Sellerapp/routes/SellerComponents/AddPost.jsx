import React from 'react';
import styles from '../../../../CSS/PokeStyles.module.css';

export default function ViewItem({ item, goBack, onDelete }) {
  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>{item.itemname || 'Item Details'}</h2>

      {/* Image Preview */}
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
        <div className={styles.sliderGroup}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{item.category || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Type</span>
          <span className={styles.value}>{item.type || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Color</span>
          <span className={styles.value}>{item.color || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Brand</span>
          <span className={styles.value}>{item.brand || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Material</span>
          <span className={styles.value}>{item.material || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Season</span>
          <span className={styles.value}>{item.season || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Gender</span>
          <span className={styles.value}>{item.gender || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Occasion</span>
          <span className={styles.value}>{item.occasion || '-'}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Price</span>
          <span className={styles.value}>${item.price || 0}</span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Temperature Range</span>
          <span className={styles.value}>
            {item.temperature_range?.[0] ?? '-'}°C to {item.temperature_range?.[1] ?? '-'}°C
          </span>
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Essential</span>
          <span className={styles.value}>{item.essential ? 'Yes' : 'No'}</span>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={onDelete}>Delete</button>
        <button className={styles.button} onClick={goBack}>Back</button>
      </div>
    </div>
  );
}
