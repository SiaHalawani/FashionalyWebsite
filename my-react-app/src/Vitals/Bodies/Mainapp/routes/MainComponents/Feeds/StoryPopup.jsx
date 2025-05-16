import React, { useState, useEffect, useRef } from 'react';
import ModalWrapper from '../../../../../contexts/ModalWrapper';
import styles from './StoryPopup.module.css';
import { getUserStories } from '../../../../../../BackendIntegration/StoriesHighlights/storyAxios';

export default function StoryPopup({ story, onClose }) {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!story?.user?.userID) return;
    const fetchStories = async () => {
      try {
        const res = await getUserStories(story.user.userID);
        const all = res.data || [];
        const reversed = all.reverse();
        const startIndex = reversed.findIndex(s => s.id === story.id);
        setStories(reversed);
        setCurrentIndex(startIndex >= 0 ? startIndex : 0);
      } catch (err) {
        console.error("❌ Failed to load user stories:", err);
      }
    };
    fetchStories();
  }, [story]);

  useEffect(() => {
    if (!stories.length) return;

    setProgress(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, stories]);

  const next = () => {
    if (currentIndex + 1 < stories.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      console.log("⛔ At first story");
    }
  };

  const handleClick = (e) => {
    e.stopPropagation(); // ✅ prevent modal close on inner click
    const { clientX, currentTarget } = e;
    const midpoint = currentTarget.offsetWidth / 2;
    if (clientX < midpoint) {
      prev();
    } else {
      next();
    }
  };

  if (!stories.length) return null;
  const current = stories[currentIndex];

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.storyPopup} onClick={handleClick}>
        <div className={styles.progressBarWrapper}>
          {stories.map((_, i) => (
            <div key={i} className={styles.progressSegment}>
              <div
                className={styles.progressFill}
                style={{
                  width:
                    i < currentIndex
                      ? '100%'
                      : i === currentIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {current.mediaType === 'video' ? (
          <video
            src={current.mediaURL}
            autoPlay
            muted
            className={styles.storyImage}
            onEnded={next}
          />
        ) : (
          <img
            src={current.mediaURL}
            alt="story"
            className={styles.storyImage}
          />
        )}

        <div className={styles.overlayText}>
          <p className={styles.username}>@{story.user?.username || "user"}</p>
          {current.caption && (
            <p className={styles.caption}>{current.caption}</p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
