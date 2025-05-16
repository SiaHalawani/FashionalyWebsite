import React, { useState } from "react";
import styles from "../../../../../CSS/weighteditor.module.css";

export default function WeightEditorTab({ weights, setWeights, onClose }) {
  const [localWeights, setLocalWeights] = useState(weights);

  const handleChange = (key, value) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setLocalWeights(prev => ({ ...prev, [key]: parsed }));
    }
  };

  const handleApply = () => {
    setWeights(localWeights);
    onClose();
  };

  return (
    <div className={styles.weightEditorTab}>
      <h2 className={styles.title}>Adjust Attribute Weights</h2>

      <div className={styles.sliderGrid}>
        {Object.entries(localWeights).map(([key, value]) => (
          <div key={key} className={styles.sliderGroup}>
            <label className={styles.label}>
              {key}: <span className={styles.value}>{value}</span>
            </label>
            <input
              className={styles.slider}
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={onClose}>Back</button>
        <button className={styles.button} onClick={handleApply}>Apply Weights</button>
      </div>
    </div>
  );
}
