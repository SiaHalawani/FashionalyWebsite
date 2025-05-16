// ✅ Updated MyStoryPopup.jsx with cleaner, feed-style layout

import React, { useState, useEffect } from 'react';
import ModalWrapper from '../../../../../contexts/ModalWrapper';
import styles from './MyStoryPopup.module.css';
import { getUserStories, deleteStory } from '../../../../../../BackendIntegration/StoriesHighlights/storyAxios';

export default function MyStoryPopup({ userId, onClose, onDeleted }) {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await getUserStories(userId);
        setStories(res.data || []);
        setCurrentIndex(0);
      } catch (err) {
        console.error("❌ Failed to load my stories:", err);
      }
    };
    fetchStories();
  }, [userId]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this story?");
    if (!confirm) return;

    try {
      const storyId = stories[currentIndex].id;
      await deleteStory(storyId);
      onDeleted();

      const updated = [...stories];
      updated.splice(currentIndex, 1);
      setStories(updated);
      if (currentIndex >= updated.length) {
        setCurrentIndex(Math.max(0, updated.length - 1));
      }
      if (updated.length === 0) {
        onClose();
      }
    } catch (err) {
      console.error("❌ Failed to delete story", err);
      alert("Failed to delete story.");
    }
  };

  const next = () => setCurrentIndex(i => (i + 1) % stories.length);
  const prev = () => setCurrentIndex(i => (i - 1 + stories.length) % stories.length);

  if (!stories.length) return null;
  const story = stories[currentIndex];

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.popup}>
        <div className={styles.storyBox}>
          <div className={styles.mediaWrapper}>
            {story.mediaType === 'video' ? (
              <video src={story.mediaURL} controls className={styles.media} />
            ) : (
              <img src={story.mediaURL} alt={story.caption || 'story'} className={styles.media} />
            )}
          </div>

          <div className={styles.caption}>{story.caption}</div>

          <div className={styles.controls}>

<button className={styles.navBtn} onClick={prev}>⬅ Prev</button>
<button className={styles.deleteBtn} onClick={handleDelete}>🗑 Delete</button>
<button className={styles.navBtn} onClick={next}>Next ➡</button>

          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
