import { useState, useRef, useEffect } from 'react';
import styles from '../../../../../CSS/explore.module.css';

export default function ExploreSection({ title, data, brandLogo, onItemClick }) {
  const scrollRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const clickTimeout = useRef(null);
  const lastMouseDown = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add(styles.dragging);
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const mouseUp = () => {
      isDown = false;
      el.classList.remove(styles.dragging);
    };

    el.addEventListener('mousedown', mouseDown);
    el.addEventListener('mousemove', mouseMove);
    el.addEventListener('mouseup', mouseUp);
    el.addEventListener('mouseleave', mouseUp);

    return () => {
      el.removeEventListener('mousedown', mouseDown);
      el.removeEventListener('mousemove', mouseMove);
      el.removeEventListener('mouseup', mouseUp);
      el.removeEventListener('mouseleave', mouseUp);
    };
  }, []);

  const handleCardMouseDown = () => {
    lastMouseDown.current = Date.now();
  };

  const handleCardClick = (item) => {
    const now = Date.now();
    if (now - lastMouseDown.current < 150) {
      onItemClick?.(item.fullItem);
    }
  };

  const visibleItems = data.slice(0, visibleCount);
  const canViewMore = data.length > visibleCount;

  // Group visible items in rows of 5 inside the scrollable track
  const chunkItems = (items, size) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };
  const itemChunks = chunkItems(visibleItems, 5);

  return (
    <div className={styles.section}>
      <div className={styles.brandHeader}>
        {brandLogo && brandLogo !== '' && <img src={brandLogo} alt="brand" />}
        <h2>{title}</h2>
      </div>

      <div className={styles.scrollContainer} ref={scrollRef}>
        <div className={styles.scrollTrack}>
          {itemChunks.map((chunk, rowIndex) => (
            <div key={rowIndex} className={styles.itemRow}>
              {chunk.map((item) => (
                <div
                  className={styles.card}
                  key={item.id}
                  onMouseDown={handleCardMouseDown}
                  onClick={() => handleCardClick(item)}
                >
                  <img src={item.img || '/fallback.png'} alt={item.title} />
                  <p><b>{item.title}</b></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {canViewMore && (
        <button
          className={styles.viewMoreBtn}
          onClick={() => setVisibleCount((prev) => prev + 12)}
        >
          View More
        </button>
      )}
    </div>
  );
}
