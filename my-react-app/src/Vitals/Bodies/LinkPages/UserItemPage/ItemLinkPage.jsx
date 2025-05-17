import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getItemById, getUserById } from './Axios';
import styles from './AdLinkPage.module.css';

export default function ItemLinkPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem = await getItemById(itemId);
      setItem(fetchedItem);
      if (fetchedItem?.userID) {
        const userData = await getUserById(fetchedItem.userID);
        setUser(userData);
      }
    };
    fetchItem();
  }, [itemId]);

  return (
  <div className={styles.overlay}>
    <div className={styles.popup}>
      <button className={styles.closeButton} onClick={() => navigate(-1)}>×</button>

      {item && user ? (
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div
              className={styles.imageBlurBackground}
              style={{ backgroundImage: `url(${item.imageURL})` }}
            />
            <img src={item.imageURL} alt={item.itemName} className={styles.adImage} />
            <p className={styles.username}>@{user.username}</p>
          </div>

          <div className={styles.metaSection}>
            <h2 className={styles.caption}>{item.itemName}</h2>

            <div className={styles.meta}>
              <p><strong>Price:</strong> ${item.price}</p>
            </div>

            <h3>Item Details</h3>
            <div className={styles.infoBox}>
              <p><strong>Color:</strong> {item.color}</p>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Season:</strong> {item.season}</p>
              <p><strong>Temperature:</strong> {item.temperatureRange}</p>
              <p><strong>Occasion:</strong> {item.occasion}</p>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Brand:</strong> {item.brand}</p>
              <p><strong>Visibility:</strong> {item.visibility}</p>
              <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            </div>

            <div className={styles.sellerInfo}>
              <h4>Uploader Info</h4>
              <div className={styles.sellerGrid}>
                <div className={styles.sellerField}>
                  <label>Username</label>
                  <p>{user.username}</p>
                </div>
                <div className={styles.sellerField}>
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className={styles.sellerField}>
                  <label>Bio</label>
                  <p>{user.bio || 'No bio provided'}</p>
                </div>
                <div className={styles.sellerField}>
                  <label>Location</label>
                  <p>{user.location || 'Unknown'}</p>
                </div>
                <div className={styles.sellerField}>
                  <label>Verified</label>
                  <p>{user.verified ? 'Yes' : 'No'}</p>
                </div>
                <div className={styles.sellerField}>
                  <label>Joined</label>
                  <p>{new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className={styles.stats}>
                <p><strong>Followers:</strong> {user.followersCount}</p>
                <p><strong>Following:</strong> {user.followingCount}</p>
              </div>

              <button
                className={styles.sellerButton}
                onClick={() => navigate(`/Fashop/User/${user.userID}`, { state: { background: location } })}
              >
                View User Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading item data...</p>
      )}
    </div>
  </div>
);

}
