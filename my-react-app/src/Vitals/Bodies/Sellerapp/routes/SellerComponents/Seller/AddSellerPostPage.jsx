import React, { useState, useRef } from 'react';
import { addSellerPost } from '../../../../../../BackendIntegration/AxiosConnections/SellerAxios';
import styles from '../../../../../CSS/PokeStyles.module.css';

export default function AddSellerPostPage({ goBack, onAddItem, sellerId, postGroupId }) {
  const [post, setPost] = useState({
    caption: '',
    image: '',
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0
  });
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPost((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPost((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!post.caption || !post.image) {
      setError('Both caption and image are required.');
      return;
    }

    const postId = `p${Date.now()}`;
    const postData = {
      caption: post.caption,
      image: post.image,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0
    };

    const payload = {
      sellerId: String(sellerId),
      postGroupId: String(postGroupId),
      postId,
      postData
    };

    try {
      console.log('🛠️ Sending:', payload);
      const response = await addSellerPost(
        payload.sellerId,
        payload.postGroupId,
        payload.postId,
        payload.postData
      );
      console.log('✅ Success:', response);
      onAddItem(postData);
      goBack();
    } catch (error) {
      console.error('❌ Error adding post:', error);
      alert('Failed to add post. Check console for details.');
    }
  };

  return (
    <div
      className={styles.filterTab}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className={styles.title}>Add New Post</h2>

      <div
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '12px',
          backgroundImage: `url(${post.image || '/src/assets/fallback.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.25rem',
          border: '2px dashed var(--background-color-btn)',
          cursor: 'pointer'
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
        <input
          name="caption"
          placeholder="Caption 🔴"
          className={styles.input}
          value={post.caption}
          onChange={handleChange}
        />
        {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>{error}</div>}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={goBack}>Cancel</button>
        <button className={styles.button} onClick={handleSubmit}>Add Post</button>
      </div>
    </div>
  );
}
