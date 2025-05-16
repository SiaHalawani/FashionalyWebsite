import React, { useState, useRef } from 'react';
import { addSellerItem } from '../../../../../../BackendIntegration/AxiosConnections/SellerAxios';
import styles from '../../../../../CSS/PokeStyles.module.css';

export default function AddSellerItemPage({ goBack, onAddItem, sellerId, groupId }) {
  const [item, setItem] = useState({
    id: '', // this will be set before submission
    itemname: '',
    category: '',
    color: '',
    brand: '',
    material: '',
    season: '',
    image: '',
    gender: '',
    occasion: '',
    price: '',
    type: '',
    temperature_range: [10, 30],
    essential: false,
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleTemperatureRangeChange = (e, index) => {
    const newTemp = [...item.temperature_range];
    newTemp[index] = parseInt(e.target.value);
    setItem({ ...item, temperature_range: newTemp });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setItem({ ...item, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setItem({ ...item, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const missing = {};
    if (!item.itemname) missing.itemname = 'Required';
    if (!item.category) missing.category = 'Required';
    if (!item.price) missing.price = 'Required';
    if (!item.season) missing.season = 'Required';
    if (!item.gender) missing.gender = 'Required';

    if (Object.keys(missing).length > 0) {
      setErrors(missing);
      return;
    }

    const itemId = `item-${Date.now()}`;
    const itemWithId = { ...item, id: itemId };

    const requestData = {
      sellerId: String(sellerId),
      groupId: String(groupId),
      itemId,
      itemData: itemWithId,
    };

    try {
      console.log('🛠 Sending item data:', requestData);
      await addSellerItem(
        requestData.sellerId,
        requestData.groupId,
        requestData.itemId,
        requestData.itemData
      );
      onAddItem(itemWithId);
      goBack();
    } catch (err) {
      console.error('❌ Error adding item:', err);
      alert('Failed to add item. See console for details.');
    }
  };

  const renderError = (field) =>
    errors[field] && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors[field]}</span>;

  return (
    <div
      className={styles.filterTab}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className={styles.title}>Add New Product</h2>

      <div
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '12px',
          backgroundImage: `url(${item.image || '/src/assets/fallback.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.25rem',
          border: '2px dashed var(--background-color-btn)',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current.click()}
        title="Click or drag image here"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div className={styles.filterGroup}>
        {renderError('itemname')}
        <input
          className={`${styles.input} ${errors.itemname ? styles.inputError : ''}`}
          placeholder="Item Name 🔴"
          name="itemname"
          value={item.itemname}
          onChange={handleChange}
        />

        {renderError('category')}
        <input
          className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
          placeholder="Category 🔴"
          name="category"
          value={item.category}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          placeholder="Type"
          name="type"
          value={item.type}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          placeholder="Brand"
          name="brand"
          value={item.brand}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          placeholder="Color"
          name="color"
          value={item.color}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          placeholder="Material"
          name="material"
          value={item.material}
          onChange={handleChange}
        />

        {renderError('season')}
        <select
          className={`${styles.select} ${errors.season ? styles.inputError : ''}`}
          name="season"
          value={item.season}
          onChange={handleChange}
        >
          <option value="">Select Season 🔴</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
          <option value="all">All Seasons</option>
        </select>

        {renderError('gender')}
        <select
          className={`${styles.select} ${errors.gender ? styles.inputError : ''}`}
          name="gender"
          value={item.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender 🔴</option>
          <option value="unisex">Unisex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          className={styles.input}
          placeholder="Occasion"
          name="occasion"
          value={item.occasion}
          onChange={handleChange}
        />

        {renderError('price')}
        <input
          className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
          placeholder="Price 🔴"
          type="number"
          name="price"
          value={item.price}
          onChange={handleChange}
        />

        <div className={styles.row}>
          <input
            className={styles.inputSmall}
            placeholder="Min Temp"
            type="number"
            value={item.temperature_range[0]}
            onChange={(e) => handleTemperatureRangeChange(e, 0)}
          />
          <input
            className={styles.inputSmall}
            placeholder="Max Temp"
            type="number"
            value={item.temperature_range[1]}
            onChange={(e) => handleTemperatureRangeChange(e, 1)}
          />
        </div>

        <div className={styles.row}>
          <label style={{ color: 'var(--text-subtitles)' }}>Essential</label>
          <input
            type="checkbox"
            name="essential"
            checked={item.essential}
            onChange={() => setItem({ ...item, essential: !item.essential })}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={goBack}>Cancel</button>
        <button className={styles.button} onClick={handleSubmit}>Add Item</button>
      </div>
    </div>
  );
}
