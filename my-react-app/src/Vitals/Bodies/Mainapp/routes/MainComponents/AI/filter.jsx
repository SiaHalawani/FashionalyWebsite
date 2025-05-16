import React, { useState } from 'react';
import styles from '../../../../../CSS/weighteditor.module.css';

export default function FilterTab({ onClose, applyFilter, currentFilters }) {
  const [filters, setFilters] = useState(currentFilters);

  const [occasionOptions, setOccasionOptions] = useState(["casual", "formal", "sport", "party", "work", "beach"]);
  const [brandOptions, setBrandOptions] = useState(["Nike", "Adidas", "Zara", "H&M"]);
  const [colorOptions, setColorOptions] = useState(["black", "white", "blue", "red", "green"]);
  const [materialOptions, setMaterialOptions] = useState(["cotton", "wool", "denim", "leather", "silk"]);

  const [customOccasion, setCustomOccasion] = useState("");
  const [customBrand, setCustomBrand] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [customMaterial, setCustomMaterial] = useState("");

  const handleAddOption = (value, setList, currentList, key) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !currentList.includes(trimmed)) {
      setList(prev => [...prev, trimmed]);
    }
    setFilters(f => ({ ...f, [key]: trimmed }));
  };

  const handleApply = () => {
    const cleaned = {
      color: filters.color?.toLowerCase() || "any",
      gender: filters.gender?.toLowerCase() === "all" ? "any" : filters.gender?.toLowerCase(),
      style: filters.occasion?.toLowerCase() || "any", // maps occasion to style
      brand: filters.brand?.toLowerCase() || "any",
      price: filters.price_range,
      material: filters.material?.toLowerCase() || "any",
      season: filters.season?.toLowerCase() === "all" ? "any" : filters.season?.toLowerCase(),
      temperature: filters.temperature,
      occasion: filters.occasion?.toLowerCase() || "any"
    };
    applyFilter(cleaned);
  };

  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>Filter Your Clothing</h2>

      {/* Gender */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Gender:</label>
        <select
          value={filters.gender}
          onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {/* Season */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Season:</label>
        <select
          value={filters.season}
          onChange={e => setFilters(f => ({ ...f, season: e.target.value }))}
          className={styles.select}
        >
          <option value="all">All</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="fall">Fall</option>
        </select>
      </div>

      {/* Occasion (mapped as style in final output) */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Occasion:</label>
        <div className={styles.row}>
          <select
            value={filters.occasion}
            onChange={e => setFilters(f => ({ ...f, occasion: e.target.value }))}
            className={styles.select}
          >
            <option value="all">All</option>
            {occasionOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add custom"
            value={customOccasion}
            onChange={e => setCustomOccasion(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddOption(customOccasion, setOccasionOptions, occasionOptions, "occasion");
                setCustomOccasion("");
              }
            }}
            className={styles.inputSmall}
          />
        </div>
      </div>

      {/* Brand */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Brand:</label>
        <div className={styles.row}>
          <select
            value={filters.brand}
            onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))}
            className={styles.select}
          >
            <option value="any">Any</option>
            {brandOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add custom"
            value={customBrand}
            onChange={e => setCustomBrand(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddOption(customBrand, setBrandOptions, brandOptions, "brand");
                setCustomBrand("");
              }
            }}
            className={styles.inputSmall}
          />
        </div>
      </div>

      {/* Color */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Color:</label>
        <div className={styles.row}>
          <select
            value={filters.color}
            onChange={e => setFilters(f => ({ ...f, color: e.target.value }))}
            className={styles.select}
          >
            <option value="any">Any</option>
            {colorOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add custom"
            value={customColor}
            onChange={e => setCustomColor(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddOption(customColor, setColorOptions, colorOptions, "color");
                setCustomColor("");
              }
            }}
            className={styles.inputSmall}
          />
        </div>
      </div>

      {/* Material */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Material:</label>
        <div className={styles.row}>
          <select
            value={filters.material}
            onChange={e => setFilters(f => ({ ...f, material: e.target.value }))}
            className={styles.select}
          >
            <option value="any">Any</option>
            {materialOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Add custom"
            value={customMaterial}
            onChange={e => setCustomMaterial(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddOption(customMaterial, setMaterialOptions, materialOptions, "material");
                setCustomMaterial("");
              }
            }}
            className={styles.inputSmall}
          />
        </div>
      </div>

      {/* Temperature */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Temperature: {filters.temperature}°C</label>
        <input
          type="range"
          min="-10"
          max="40"
          step="1"
          value={filters.temperature}
          onChange={e => setFilters(f => ({ ...f, temperature: Number(e.target.value) }))}
          className={styles.slider}
        />
      </div>

      {/* Price */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Max Price: ${filters.price_range}</label>
        <input
          type="range"
          min="0"
          max="200"
          step="1"
          value={filters.price_range}
          onChange={e => setFilters(f => ({ ...f, price_range: Number(e.target.value) }))}
          className={styles.slider}
        />
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={onClose}>Back</button>
        <button className={styles.button} onClick={handleApply}>Apply Filters</button>
      </div>
    </div>
  );
}
