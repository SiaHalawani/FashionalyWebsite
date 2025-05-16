// src/Vitals/Components/ModalWrapper.jsx
import React from 'react';
import styles from '../CSS/ModalWrapper.module.css'; // you'll create this CSS file

export default function ModalWrapper({ children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
