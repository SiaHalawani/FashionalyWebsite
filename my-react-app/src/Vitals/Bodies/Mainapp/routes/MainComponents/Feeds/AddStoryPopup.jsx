import React, { useState } from 'react';
import ModalWrapper from '../../../../../contexts/ModalWrapper';
import styles from './AddStoryPopup.module.css';
import { createStory } from '../../../../../../BackendIntegration/StoriesHighlights/storyAxios';
import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

export default function ManageMyStoriesPopup({ userId, onClose }) {
  const [mediaURL, setMediaURL] = useState('');
  const [caption, setCaption] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const uploadedUrl = await uploadImageViaBackend(file);
      setMediaURL(uploadedUrl);
      setError('');
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async () => {
    if (!mediaURL.trim()) return alert('Media is required!');
    setLoading(true);
    try {
      await createStory({
        mediaURL,
        caption,
        mediaType,
        visibility: 'followers',
      });
      alert("✅ Story posted successfully!");
      onClose();
    } catch (err) {
      console.error('❌ Failed to create story:', err);
      alert("Failed to create story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.popup}>
        <h2>Add a New Story</h2>

        <input
          className={styles.input}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
        />

        {mediaURL && mediaType === 'image' && (
          <img src={mediaURL} alt="preview" className={styles.preview} />
        )}
        {mediaURL && mediaType === 'video' && (
          <video src={mediaURL} controls className={styles.preview} />
        )}

        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className={styles.input}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <textarea
          placeholder="Add a caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={styles.input}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button
          onClick={handleCreateStory}
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Posting...' : 'Post Story'}
        </button>
      </div>
    </ModalWrapper>
  );
}
