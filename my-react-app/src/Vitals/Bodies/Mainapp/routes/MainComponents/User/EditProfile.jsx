import React, { useState, useRef } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';

export default function EditProfile({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...user });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={styles.filterTab}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className={styles.title}>Edit Profile</h2>

      {/* Profile Picture */}
      <div
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundImage: `url(${formData.profilePicture || '/src/assets/fallback.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid var(--background-color-btn)',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current.click()}
        title="Click or drop an image to change"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <div className={styles.filterGroup}>
        <label className={styles.label}>Full Name</label>
        <input
          name="fullName"
          className={styles.input}
          value={formData.fullName}
          onChange={handleChange}
        />

        <label className={styles.label}>Bio</label>
        <textarea
          name="bio"
          className={styles.input}
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about yourself..."
          style={{ resize: 'vertical' }}
        />

        <label className={styles.label}>About</label>
        <textarea
          name="about"
          className={styles.input}
          value={formData.about}
          onChange={handleChange}
          rows={4}
          placeholder="More detailed description..."
          style={{ resize: 'vertical' }}
        />

        <label className={styles.label}>Location</label>
        <input
          name="location"
          className={styles.input}
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={onCancel} className={styles.button}>Cancel</button>
        <button onClick={() => onSave(formData)} className={styles.button}>Save</button>
      </div>
    </div>
  );
}
