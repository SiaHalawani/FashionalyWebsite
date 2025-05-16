import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import { getUserById } from '../../../../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { uploadImageViaBackend } from '../../../../../../../Utils/uploadImageToImageKit';
import styles from '../../../../../../CSS/PokeStyles.module.css';

export default function EditProfile({ onCancel }) {
  const navigate = useNavigate();
  const { profileData, refreshUserData } = useGlobalState();
  const userId = profileData?.userId;
  const token = localStorage.getItem('token');

  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const result = await getUserById(userId);
        setUserData(result);
        setFormData(result);
      };
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const uploadedURL = await uploadImageViaBackend(file);
        setFormData((prev) => ({ ...prev, profilePicture: uploadedURL }));
      } catch (error) {
        console.error('❌ Image upload failed:', error);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        'http://localhost:5005/api/users/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('✅ Profile updated:', res.data);
      setUserData(res.data);
      setEditMode(false);
      await refreshUserData();
    } catch (err) {
      console.error('❌ Update failed:', err.response?.data || err);
    }
  };

  if (!userData) return <div className={styles.filterTab}>Loading profile...</div>;

  return (
    <div
      className={styles.filterTab}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <button className={styles.button} onClick={onCancel}>← Back</button>
      <h2 className={styles.title}>Edit Profile</h2>

      {/* Profile Picture */}
      <div
        style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          backgroundImage: `url(${formData.profilePicture || '/src/assets/fallback.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid #ccc',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current.click()}
        title="Click or drop to change picture"
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <div className={styles.filterGroup}>
        {editMode ? (
          <>
            <label className={styles.label}>Email</label>
            <input className={styles.input} name="email" value={formData.email || ''} onChange={handleChange} />

            <label className={styles.label}>Username</label>
            <input className={styles.input} name="username" value={formData.username || ''} onChange={handleChange} />

            <label className={styles.label}>Full Name</label>
            <input className={styles.input} name="fullName" value={formData.fullName || ''} onChange={handleChange} />

            <label className={styles.label}>Phone</label>
            <input className={styles.input} name="phone" value={formData.phone || ''} onChange={handleChange} />

            <label className={styles.label}>Location</label>
            <input className={styles.input} name="location" value={formData.location || ''} onChange={handleChange} />

            <label className={styles.label}>Bio</label>
            <textarea className={styles.input} name="bio" value={formData.bio || ''} onChange={handleChange} rows={3} />

            <div className={styles.buttonGroup}>
              
              <button className={styles.button} onClick={() => setEditMode(false)}> Cancel</button>
              <button className={styles.button} onClick={handleSave}> Save</button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.label}><strong>Email:</strong> {userData.email}</p>
            <p className={styles.label}><strong>Username:</strong> @{userData.username}</p>
            <p className={styles.label}><strong>Full Name:</strong> {userData.fullName || 'Not provided'}</p>
            <p className={styles.label}><strong>Phone:</strong> {userData.phone || 'Not provided'}</p>
            <p className={styles.label}><strong>Location:</strong> {userData.location || 'Not provided'}</p>
            <p className={styles.label}><strong>Bio:</strong> {userData.bio || 'No bio yet'}</p>

            <button className={styles.button} onClick={() => setEditMode(true)}>✏️ Edit</button>
          </>
        )}
      </div>
    </div>
  );
}
