import React, { useState } from 'react';
import styles from '../../../../CSS/PokeStyles.module.css';
import { editSellerPost, deleteSellerPost } from '../../../../../BackendIntegration/AxiosConnections/SellerAxios';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';

export default function ViewPost({ item, goBack, onDelete, onUpdate }) {
  const { sellerProfile } = useSellerState();
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(item.caption);

  const handleUpdate = async () => {
    const sellerId = sellerProfile?.sellerId;
    const postGroupId = item.groupId || 'default-post-group';
    const postId = item.id;
    const postData = { caption };

    console.log('[ViewPost → handleUpdate] Sending update:', {
      sellerId,
      postGroupId,
      postId,
      postData
    });

    try {
      await editSellerPost(sellerId, postGroupId, postId, postData);
      const updated = { ...item, caption };
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  const handleDelete = async () => {
    const sellerId = sellerProfile?.sellerId;
    const postGroupId = item.groupId;
    const postId = item.id;

    console.log('[ViewPost → handleDelete] Sending delete:', {
      sellerId,
      postGroupId,
      postId
    });

    try {
      await deleteSellerPost(sellerId, postGroupId, postId);
      onDelete();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>View Post</h2>

      <div
        style={{
          width: '220px',
          height: '220px',
          borderRadius: '14px',
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid var(--background-color-btn)',
        }}
      />

      <div className={styles.filterGroup}>
        <div className={styles.label}><strong>Caption:</strong></div>
        {isEditing ? (
          <textarea
            className={styles.input}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        ) : (
          <div className={styles.value}>{item.caption}</div>
        )}

        <div className={styles.label}><strong>Posted On:</strong></div>
        <div className={styles.value}>{new Date(item.timestamp).toLocaleString()}</div>

        <div className={styles.label}>
          <strong>Likes:</strong> {item.likes} | <strong>Comments:</strong> {item.comments}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        {isEditing ? (
          <>
            <button className={styles.button} onClick={handleUpdate}>Save</button>
            <button className={styles.button} onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className={styles.button} onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className={styles.button} onClick={handleDelete}>Delete</button>
        <button className={styles.button} onClick={goBack}>Back</button>
      </div>
    </div>
  );
}
