import { useState, useEffect } from 'react';
import styles from '../../../../../CSS/explore.module.css';

export default function ExploreFilter({ onApply, onClose, initialFilters = {} }) {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters(prev => ({
      ...{
        sellerName: '',
        category: '',
        gender: '',
        itemName: '',
        brand: '',
        occasion: '',
        priceMin: '',
        priceMax: '',
        ratingMin: '',
        ratingMax: ''
      },
      ...initialFilters,
      ...prev
    }));
  }, [initialFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const query = Object.entries(filters)
      .filter(([_, val]) => val !== '')
      .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&');
    onApply(query, filters);
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterHeader}>
        <h2>Explore Filters</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className={styles.filterBody}>
        {Object.entries(filters).map(([key, val]) => (
          <div key={key} className={styles.filterGroup}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={val}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button className={styles.applyBtn} onClick={applyFilters}>Apply</button>
      </div>
    </div>
  );
}
